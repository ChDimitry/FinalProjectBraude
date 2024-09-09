const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const cors = require("cors");
const corsAnywhere = require("cors-anywhere");

const app = express();
const server = http.createServer(app);

// Configure socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "fiware-service",
      "fiware-servicepath",
      "Link",
      "Accept",
    ],
  },
});

// Enable CORS for all origins on Express
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "fiware-service",
      "fiware-servicepath",
      "Link",
      "Accept",
    ],
  })
);

// Set up CORS Anywhere for proxied requests
const corsProxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: [],
});

// CORS proxy route
app.use("/cors-anywhere", (req, res) => {
  corsProxy.emit("request", req, res);
});

let cachedData = null;
let totalDataSent = 0; // Track total data sent for speed calculation

// Function to fetch filtered graph data from the API based on filter parameters
const fetchFilteredGraphData = async (
  deviceID,
  deviceType,
  startDateTime,
  endDateTime
) => {
  try {
    // Construct the API URL dynamically based on the filter parameters
    const API_URL = `http://172.16.101.172:8668/v2/entities/urn:ngsi-ld:${deviceType}:${deviceID}?fromDate=${startDateTime.toISOString()}&toDate=${endDateTime.toISOString()}`;
    console.log("Fetching data from API:", API_URL);

    const response = await axios.get(
      `http://localhost:5000/cors-anywhere/${API_URL}`,
      {
        headers: {
          Accept: "application/json",
          Link: '<http://context/ngsi-context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"',
          "fiware-service": "openiot",
          "fiware-servicepath": "/",
        },
      }
    );

    // Return the fetched data
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered graph data:", error.message);
    throw new Error("Failed to fetch filtered graph data.");
  }
};

// Function to fetch data from the API
const fetchDevices = async () => {
  try {
    // API URL (using the CORS proxy)
    const API_URL =
      "http://172.16.101.172:1026/ngsi-ld/v1/entities/?local=true";
    const response = await axios.get(
      `http://localhost:5000/cors-anywhere/${API_URL}`,
      {
        headers: {
          Accept: "application/json",
          Link: '<http://context/ngsi-context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"',
          "fiware-service": "openiot",
          "fiware-servicepath": "/",
        },
      }
    );
    cachedData = response.data;
    const dataSize = JSON.stringify(cachedData).length; // Calculate the size of the data
    totalDataSent += dataSize; // Increment total data sent

    io.emit("devices", cachedData); // Broadcast the data to all connected clients
  } catch (error) {
    console.error("Error fetching data from external API:", error.message);
  }
};

// Function to calculate and emit transfer speed
const calculateAndEmitSpeed = () => {
  const transferSpeed = totalDataSent / 5; // Calculate speed (data per second)
  io.emit("transferSpeed", transferSpeed);
  totalDataSent = 0; // Reset total data sent
};

fetchDevices();
setInterval(fetchDevices, 5000);
setInterval(calculateAndEmitSpeed, 5000); // Calculate and emit speed every 5 seconds

io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for 'filterData' event from the client
  socket.on(
    "graphFilterData",
    async ({
      deviceID,
      deviceType,
      attributeKey,
      startDateTime,
      endDateTime,
      lastX,
    }) => {
      console.log("Received filter data from client:", {
        deviceID,
        deviceType,
        startDateTime,
        endDateTime,
        lastX,
      });

      try {
        // Use the fetchFilteredGraphData function to fetch data from the external API
        const fetchedData = await fetchFilteredGraphData(
          deviceID,
          deviceType,
          new Date(startDateTime),
          new Date(endDateTime)
        );

        const formattedKey = attributeKey.replace(/ /g, "_");

        const times = fetchedData.index;
        const attributes = fetchedData.attributes;
        const requestedAttribute = attributes.find(
          (attr) => attr.attrName == formattedKey
        );
        const attributeData = requestedAttribute.values.slice(-lastX);
        const attributeTimes = times.slice(-lastX);
        // Create a list of { value, timestamp } objects
        const requestedData = attributeData.map((value, index) => ({
          value,
          timestamp: attributeTimes[index],
        }));
        // Emit the fetched data back to the client
        socket.emit("graphFilteredData", requestedData);
      } catch (error) {
        console.error("Error fetching filtered graph data:", error.message);
        socket.emit("error", {
          message: "Failed to fetch filtered graph data.",
        });
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
