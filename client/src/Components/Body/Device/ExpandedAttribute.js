import React, { useContext, useState } from "react";
import { AppDarkMode } from "../../../App";
import DynamicLineChart from "../../Graphs/DynamicLineChart";

const ExpandedAttribute = ({
  onToggleExpand,
  attributeKey,
  attributeValue,
  attributeValuesList,
}) => {
  const darkMode = useContext(AppDarkMode);

  // State for filtering options
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastXValues, setLastXValues] = useState("");

  // Function to submit the filter form
  const submitForm = () => {
    // Validate the form fields
    if (startTime === "" || endTime === "" || startDate === "" || endDate === "" || lastXValues === "") {
      document.getElementById("attribute-graph-submit-error-message").innerText = "Please fill in all fields";
      return;
    }

  };


  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between mb-3 items-top">
        <h1
          className={`text-lg font-bold p-2 ${
            darkMode ? "text-[#ffffff]" : "text-[#304463]"
          }`}
        >
          ATTRIBUTE GRAPHS
        </h1>

        <button
          onClick={onToggleExpand}
          className="h-fit text-gray-900 border border-gray-200 focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-100 rounded text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Close
        </button>
      </div>

      {/* Graph Filter Form */}
      <div
        className={`h-fit rounded p-4 ${
          darkMode ? "bg-[#50698f]" : "bg-white"
        } shadow-md`}
      >
        <div className="grid grid-cols-2 gap-3 auto-rows-auto pb-5">
          {/* Start/End Time */}
          <div>
            <label>Start Time</label>
            <input
              type="time"
              className="border p-1 ml-3 rounded"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              type="time"
              className="border p-1 ml-3 rounded"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          {/* Start/End Date */}
          <div>
            <label>Start Date</label>
            <input
              type="date"
              className="border p-1 ml-3 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              className="border p-1 ml-3 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Last X Values */}
          <div>
            <label>Last X Values</label>
            <input
              type="number"
              className="border p-1 ml-3 rounded w-[80px]"
              placeholder="Enter X"
              value={lastXValues}
              onChange={(e) => setLastXValues(e.target.value)}
            />
          </div>
        </div>
        <button onClick={submitForm} className="h-fit text-gray-900 border border-gray-200 focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-100 rounded text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Submit
        </button>{" "}
        <span id="attribute-graph-submit-error-message" className="text-red-500 ml-2"></span>
      </div>

      {/* Graph Display */}
      <div
        className={`h-fit rounded p-4 ${
          darkMode ? "bg-[#50698f]" : "bg-white"
        } shadow-md`}
      >
        <p>{attributeKey}</p>
        <DynamicLineChart values={attributeValuesList} />
      </div>
    </div>
  );
};

export default ExpandedAttribute;
