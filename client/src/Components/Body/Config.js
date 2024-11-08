import React, { useEffect, useState, useContext } from "react";
import { AppDarkMode } from "../../App";
const Config = () => {
  const darkMode = useContext(AppDarkMode);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-top">
        <div
          className={`rounded w-[100%] p-4 ${
            darkMode ? "bg-[#50698f]" : "bg-white"
          } shadow-md`}
        >
          Config
        </div>
      </div>
    </div>
  );
};

export default Config;
