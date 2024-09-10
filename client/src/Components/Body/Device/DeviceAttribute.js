import React, { useState, useEffect, useRef, useContext } from "react";
import ExpandedAttribute from "./ExpandedAttribute";
import { AppDarkMode } from "../../../App";
import DynamicLineChart from "../../Graphs/DynamicLineChart";

const DeviceAttribute = ({
  deviceID,
  deviceType,
  attributeKey,
  attributeValue,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [animate, setAnimate] = useState(false);
  const menuRef = useRef(null);
  const darkMode = useContext(AppDarkMode);
  const [attributeValues, setAttributeValues] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    // Ensure attributeValue exists before updating
    if (attributeValue === undefined) return;

    // Create a new entry for the current attribute value
    const newEntry = { value: attributeValue, timestamp: Date.now() };
    setLastUpdated(newEntry.timestamp);
    setAttributeValues((prev) => {
      const updatedValues = [...prev, newEntry];

      // Limit the number of values to display
      if (updatedValues.length > 25) {
        updatedValues.shift();
      }

      return updatedValues;
    });
  }, [attributeValue]);

  const onToggleExpand = () => {
    if (expanded) {
      // Trigger slide-out animation first
      setAnimate(true);
      setTimeout(() => {
        setExpanded(false);
        setAnimate(false);
      }, 200);
    } else {
      setExpanded(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onCloseMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, onCloseMenu]);

  return (
    <>
      <div
        className={`p-4 shadow-md hover:shadow-lg transition-shadow duration-100 flex flex-col relative group
          ${darkMode ? "bg-[#50698f]" : "bg-white"} 
           
          `}
      >
        <div className="flex justify-between">
          <span className="font-semibold break-words overflow-hidden text-ellipsis">
            {attributeKey}
          </span>
          <div
            className={`z-10 ${
              expanded ? "opacity-100" : "opacity-0"
            } flex group-hover:opacity-100 transition-opacity duration-100`}
          >
            <button onClick={onToggleExpand} className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
                />
              </svg>
            </button>
            <button onClick={onToggleMenu} className="relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-6 top-9 bg-white border border-gray-200 rounded shadow-lg z-20 w-24"
            >
              <ul className="py-1">
                <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm">
                  Pin
                </li>
                <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm">
                  Hide
                </li>
                <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm">
                  More...
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="break-words flex-grow">{attributeValue}</div>
        {attributeKey.includes("value") && (
          <span className="text-xs text-gray-500 h-4">
            Last Update: {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </div>
      {expanded && (
        <div
          className={`absolute top-[15%] mt-[2px] right-[25%] ml-4 ${
            darkMode ? "bg-[#445672]" : "bg-gray-100"
          } bg-opacity-90 h-[868px] w-[800px] p-4 rounded-tl rounded-bl overflow-auto`}
          style={{
            animation: animate
              ? "slideOut 0.2s ease-out forwards"
              : "slideIn 0.2s ease-out forwards",
          }}
        >
          <ExpandedAttribute
            onToggleExpand={onToggleExpand}
            deviceID={deviceID}
            deviceType={deviceType}
            attributeKey={attributeKey}
            attributeValue={attributeValue}
            attributeValuesList={attributeValues}
          />
        </div>
      )}
    </>
  );
};

export default DeviceAttribute;
