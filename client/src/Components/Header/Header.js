// Header.js
import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center h-20 shadow-md">
      <div className="relative flex justify-start items-end h-full left-[12px]">
        <button className="h-10 w-24 mx-1 text-sm text-[#373A40] bg-[#EEEEEE]  focus:outline-none">
          Home
        </button>
        <button className="h-10 w-24 mx-1 text-sm text-[#373A40] bg-[#EEEEEE] focus:outline-none">
          Devices
        </button>
        <button className="h-10 w-24 mx-1 text-sm text-[#373A40] bg-[#EEEEEE] focus:outline-none">
          About Us
        </button>
        <button className="h-10 w-24 mx-1 text-sm text-[#373A40] bg-[#EEEEEE] focus:outline-none">
          Contact
        </button>
      </div>

      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full focus:outline-none"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
    </header>
  );
};

export default Header;
