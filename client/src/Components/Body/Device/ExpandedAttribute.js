import React from "react";

const ExpandedAttribute = ({ onToggleExpand }) => {
  return (
    <>
      <div className="flex justify-between mb-3 items-top">
        <h1 className="text-lg font-bold p-2 text-[#304463]">GRAPH CREATION</h1>

        <button
          onClick={onToggleExpand}
          className="h-fit text-gray-900 border border-gray-200 focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-100 rounded text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Close
        </button>
      </div>
      <div className="h-fit bg-gray-100 rounded p-4 bg-white shadow-md">
        Output different types of graphs here...
      </div>
    </>
  );
};

export default ExpandedAttribute;
