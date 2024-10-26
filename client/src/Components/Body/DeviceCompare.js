import React, { useContext, useState, useEffect } from "react";
import { AppDarkMode } from "../../App";
import DynamicLineChart from "../Graphs/DynamicLineChart";
import { parseAttributeKey } from "../../Utils/StringParser";

const DeviceCompareScreen = ({ socket, onToggleExpand }) => {
  const darkMode = useContext(AppDarkMode);

  // State for filtering options
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastXValues, setLastXValues] = useState("");

  const [deviceID, setDeviceID] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  // State to store the graphs
  const [graphs, setGraphs] = useState([]);

  // Loading state to handle spinner visibility
  const [loading, setLoading] = useState(false);

  const submitGraphFilter = async () => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const lastX = parseInt(lastXValues);

    // Show the loading spinner
    setLoading(true);

    // Emit the filter data to the server via Socket.io
    socket.emit("graphFilterData", {
      deviceID,
      deviceType,
      attributeKey,
      startDateTime,
      endDateTime,
      lastX,
    });
  };

  // Listen for the filtered data from the server
  useEffect(() => {
    socket.on("graphFilteredData", (data) => {
      const newGraphData = data;
      console.log("Filtered Data:", data);

      // Stop the loading spinner
      setLoading(false);

      // Append the new graph data
      setGraphs((prevGraphs) => [newGraphData, ...prevGraphs]);
    });

    socket.on("selectedDeviceData", (data) => {
      // Handle received data here
      // console.log("Selected Device Data:", data);
      setDeviceID(data.deviceID);
      setDeviceType(data.deviceType);
      setAttributeKey(data.attributeKey);
      setAttributeValue(data.attributeValue);
    });

    socket.on("error", (error) => {
      console.error("Error received from server:", error.message);
      setLoading(false); // Stop loading if there's an error
    });

    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("graphFilteredData");
      socket.off("error");
      socket.off("selectedDeviceData");
    };
  }, [socket]);

  // Function to remove a specific graph from the list
  const removeGraph = (indexToRemove) => {
    setGraphs((prevGraphs) =>
      prevGraphs.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-top">
          <div className="flex items-center rounded bg-white p-4 shadow-md">
            <span className="font-light mr-3">{deviceID}</span>
            <span className="color-[#304463] whitespace-nowrap font-bold">{parseAttributeKey(attributeKey)}</span>
          </div>

          <div className="grid grid-flow-col auto-cols-max gap-3">
            <button className="flex items-center gap-2 align-right h-fit text-gray-900 border border-gray-200 focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-100 rounded text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>

              <span>Export</span>
            </button>
            <button
              onClick={onToggleExpand}
              className="h-fit text-gray-900 border border-gray-200 focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-100 rounded text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        {/* Graph Filter Form - Date */}
        <div
          className={`h-fit rounded p-4 ${
            darkMode ? "bg-[#50698f]" : "bg-white"
          } shadow-md`}
        >
          <div className="grid grid-rows-2 grid-flow-col gap-3">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                className="border p-1 ml-3 rounded focus:outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                className="border p-1 ml-3 rounded focus:outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label>Start Time</label>
              <input
                type="time"
                className="border p-1 ml-3 rounded focus:outline-none"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label>End Time</label>
              <input
                type="time"
                className="border p-1 ml-3 rounded focus:outline-none"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div>
              <label>Last X Values</label>
              <input
                type="number"
                className="border p-1 ml-3 rounded w-[100px] focus:outline-none"
                placeholder="1000"
                value={lastXValues}
                onChange={(e) => setLastXValues(e.target.value)}
              />
            </div>
            <button
              onClick={submitGraphFilter}
              className="w-fit h-fit text-gray-900 border border-gray-200 hover:bg-white hover:border-gray-300 rounded text-sm px-4 py-2"
            >
              Generate
            </button>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="m-4 w-10 h-10 border-4 border-gray-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {/* Graph Display */}
        {graphs.map((values, index) => (
          <div
            key={index}
            className={`group h-fit rounded p-4 ${
              darkMode ? "bg-[#50698f]" : "bg-white"
            } shadow-md`}
          >
            {/* Icons that appear only on hover */}
            <div className="flex flex-row-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                className="relative z-10"
                onClick={() => removeGraph(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute size-5 top-0 right-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <DynamicLineChart time={new Date().toLocaleTimeString()} lastX={values.lastX} attributeKey={values.attributeKey} deviceID={values.deviceID} created={values.created} values={values.values} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DeviceCompareScreen;
