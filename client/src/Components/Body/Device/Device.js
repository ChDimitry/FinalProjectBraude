import React, { useContext, useState, useEffect } from "react";
import DeviceAttribute from "./DeviceAttribute";
import BarChart from "../../Graphs/BarChart";
import { AppDarkMode } from "../../../App";

const Device = ({ socket, onExpandCompare, device }) => {
  const [openMenuKey, setOpenMenuKey] = useState(null); // Track the open menu
  const darkMode = useContext(AppDarkMode);

  const handleMenuToggle = (key) => {
    setOpenMenuKey(openMenuKey === key ? null : key); // Toggle the menu
  };

  // Prepare data for the chart
  const chartData = Object.keys(device)
    .filter((key) => key.toLowerCase().includes("value"))
    .splice(0, 5)
    .map((key) => {
      return {
        name: key,
        value: JSON.parse(JSON.stringify(device[key])).value,
      };
    })
    .filter((item) => item !== null);

  return (
    <div className="z-10 flex flex-col gap-3 h-full h-[800px]">
      {/* Attributes Section */}
      <div className="overflow-auto rounded md:h-[60%]">
        <div className="grid grid-cols-2 gap-3 auto-rows-auto">
          <DeviceAttribute
            key={"type"}
            socket={socket} // Pass the socket to the attribute
            attributeKey={"Device"}
            attributeValue={device.type}
            isMenuOpen={openMenuKey === "type"}
            onToggleMenu={() => handleMenuToggle("type")}
            onCloseMenu={() => setOpenMenuKey(null)}
          />
          {Object.keys(device)
            .sort() // Sort the keys to ensure consistent order
            .map((key) => {
              return (
                <DeviceAttribute
                  key={key}
                  socket={socket} // Pass the socket to each attribute
                  deviceID={device.id.split(":").slice(-2).join(":")}
                  deviceType={device.type}
                  attributeKey={key}
                  attributeValue={JSON.parse(JSON.stringify(device[key])).value}
                  isMenuOpen={openMenuKey === key}
                  onToggleMenu={() => handleMenuToggle(key)}
                  onCloseMenu={() => setOpenMenuKey(null)}
                  onExpandCompare={onExpandCompare}
                  darkMode={darkMode}
                />
              );
            })}
        </div>
      </div>
      <hr className="w-[400px] h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-700"></hr>
      {/* Charts Section */}
      {device.type.includes("Sensor") && (
        <div className="self-stretch md:h-[50px] flex flex-row ml-[-25px]">
          {chartData.map((data, index) => (
            <BarChart key={index} data={data} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Device;
