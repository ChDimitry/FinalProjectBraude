const axios = require("axios");
let cachedData = null;
let totalDataSent = 0; // Track total data sent for speed calculation


// Function to fetch filtered graph data from the API based on filter parameters
const fetchFilteredGraphData = async (
    deviceID,
    deviceType,
    startDateTime,
    endDateTime,
    lastX
  ) => {
    try {
      // Construct the API URL dynamically based on the filter parameters
      const API_URL = `http://172.16.101.172:8668/v2/entities/urn:ngsi-ld:${deviceType}:${deviceID}?lastN=${lastX}&fromDate=${startDateTime.toISOString()}&toDate=${endDateTime.toISOString()}`;
      console.log("Fetching data from API:", API_URL);
  
      const response = await axios.get(
        `https://server-kohl-delta.vercel.app/cors-anywhere/${API_URL}`,
        {
          headers: {
            Accept: "application/json",
            Link: '<http://context/ngsi-context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"',
            "fiware-service": "openiot",
            "fiware-servicepath": "/",
            "X-Requested-With": "XMLHttpRequest", // Add this header
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
  const fetchDevices = async (io, currentUseCaseValue) => {
    try {
      // Define the API URL
      const API_URL = "http://172.16.101.172:1026/ngsi-ld/v1/entities/?local=true";
  
      // Call the API through the proxy
      const response = await axios.get(
        `https://server-kohl-delta.vercel.app/cors-anywhere/${API_URL}`,
        {
          headers: {
            Accept: "application/json",
            Link: '<http://context/ngsi-context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"',
            "fiware-service": "openiot",
            "fiware-servicepath": "/",
            "X-Requested-With": "XMLHttpRequest", // Add this header
          },
        }
      );
  
      // Filter devices based on the useCases attribute
      let filteredData = response.data;
      if (currentUseCaseValue !== "All") {
        filteredData = response.data.filter(
          (device) => device.useCases && device.useCases.value === currentUseCaseValue
        );
      }
  
      // Cache and emit the data
      cachedData = filteredData;
      const dataSize = JSON.stringify(cachedData).length;
      totalDataSent += dataSize;
      io.emit("devices", cachedData);
    } catch (error) {
      console.error("Error fetching data from external API:", error.message);
    }
  };
  

// Function to calculate and emit transfer speed
const calculateAndEmitSpeed = (io) => {
    const transferSpeed = totalDataSent / 5; // Calculate speed (data per second)
    io.emit("transferSpeed", transferSpeed);
    totalDataSent = 0; // Reset total data sent
};

module.exports = {
    fetchFilteredGraphData,
    fetchDevices,
    calculateAndEmitSpeed,
};