import React, { useEffect, useState, useContext } from "react";
import { AppDarkMode } from "../../App";
const Config = () => {
  const darkMode = useContext(AppDarkMode);

  const [refreshTime, setRefreshTime] = useState("");
  const [useCaseValue, setUseCaseValue] = useState("Braude");

  const useCaseOptions = [
    "All",
    "Braude",
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-top">
        <h1
            className={`text-lg text-${
              darkMode ? "[#ffffff]" : "[#304463]"
            } font-bold p-2`}
          >
            CONFIGURATION
        </h1>
      </div>
      <div className={`rounded w-[100%] p-4 ${darkMode ? "bg-[#50698f]" : "bg-white"} shadow-md`}>
        <div className="grid grid-rows-2 grid-flow-col gap-3">
          <div>
            <label>Use Case</label>
            <select
              value={useCaseValue}
              onChange={(e) => setUseCaseValue(e.target.value)}
              className="border p-1 ml-1 rounded w-[100px] focus:outline-none text-black"
            >
              <option value="" disabled>Select a use case</option>
              {useCaseOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Refresh Time</label>
            <input
              type="number"
              className="border p-1 ml-3 rounded w-[100px] focus:outline-none text-black"
              placeholder="1000"
              value={refreshTime}
              onChange={(e) => setRefreshTime(e.target.value)}
            />
            <label> milliseconds </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;
