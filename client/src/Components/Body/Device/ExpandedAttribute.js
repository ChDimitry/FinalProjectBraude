import React, { useContext, useState } from "react";
import { AppDarkMode } from "../../../App";
import DynamicLineChart from "../../Graphs/DynamicLineChart";

const ExpandedAttribute = ({
  deviceID,
  deviceType,
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

  // Submit functions for each form
  const submitTimeFilter = async () => {};

  const submitDateFilter = async () => {};

  const submitLastXValues = async () => {};

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between mb-3 items-top overflow-auto ">
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

      {/* Graph Filter Form - Time */}
      <div
        className={`h-fit rounded p-4 ${
          darkMode ? "bg-[#50698f]" : "bg-white"
        } shadow-md`}
      >
        <div className="grid grid-cols-[20px,2fr,2fr,1fr] gap-3">
          <span class="self-center flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
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
          <button
            onClick={submitTimeFilter}
            className="w-fit h-fit text-gray-900 border border-gray-200 hover:bg-white hover:border-gray-300 rounded text-sm px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Graph Filter Form - Date */}
      <div
        className={`h-fit rounded p-4 ${
          darkMode ? "bg-[#50698f]" : "bg-white"
        } shadow-md`}
      >
        <div className="grid grid-cols-[20px,2fr,2fr,1fr] gap-3">
          <span class="self-center flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
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
          <button
            onClick={submitDateFilter}
            className="w-fit h-fit text-gray-900 border border-gray-200 hover:bg-white hover:border-gray-300 rounded text-sm px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Graph Filter Form - Last X Values */}
      <div
        className={`h-fit rounded p-4 ${
          darkMode ? "bg-[#50698f]" : "bg-white"
        } shadow-md`}
      >
        <div className="grid grid-cols-[20px,2fr,2fr,1fr] gap-3">
          <span class="self-center flex w-3 h-3 me-3 bg-teal-500 rounded-full"></span>
          <div>
            <label>Last X Values</label>
            <input
              type="number"
              className="border p-1 ml-3 rounded w-[100px] focus:outline-none"
              placeholder="Enter X"
              value={lastXValues}
              onChange={(e) => setLastXValues(e.target.value)}
            />
          </div>
          <empty></empty>
          <button
            onClick={submitLastXValues}
            className="w-fit h-fit text-gray-900 border border-gray-200 hover:bg-white hover:border-gray-300 rounded text-sm px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Graph Display */}
      <div
        className={`h-fit rounded p-4 ${
          darkMode ? "bg-[#50698f]" : "bg-white"
        } shadow-md`}
      >
        <p>
          {attributeKey} ({attributeValue})
        </p>
        <DynamicLineChart values={attributeValuesList} />
      </div>
    </div>
  );
};

export default ExpandedAttribute;
