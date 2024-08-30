import React, { useState, useEffect, useRef } from "react";

const DeviceAttribute = ({
  attributeKey,
  attributeValue,
  isOpen,
  onToggleMenu,
  onCloseMenu,
  darkMode,
}) => {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onCloseMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCloseMenu]);

  return (
    <div className="bg-gray-100 rounded p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-100 flex flex-col relative group">
      <div className="flex justify-between">
        <span className="font-semibold break-words overflow-hidden text-ellipsis">
          {attributeKey}
        </span>

        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <button onClick={toggleExpand} className="relative z-10">
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
        {isOpen && (
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
    </div>
  );
};

export default DeviceAttribute;
