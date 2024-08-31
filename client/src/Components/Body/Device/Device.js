import React, { useState } from "react";
import DeviceAttribute from "./DeviceAttribute";

import BarChart from "../../Graphs/BarChart";

const Device = ({ device, darkMode }) => {
  const [openMenuKey, setOpenMenuKey] = useState(null); // Track the open menu

  const handleMenuToggle = (key) => {
    setOpenMenuKey(openMenuKey === key ? null : key); // Toggle the menu
  };

  // Function to convert key names and extract the value from the JSON object
  const parseAttribute = (key, value) => {
    let displayKey = key;
    let displayValue = null;

    displayKey = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    if (displayKey.toLowerCase().includes("entity")) {
      displayKey = "Entity Type";
    }

    // Extract the "value" field from the JSON object if it exists
    try {
      const parsedValue = JSON.parse(value);
      if (
        parsedValue &&
        typeof parsedValue === "object" &&
        parsedValue.value !== undefined
      ) {
        displayValue = parsedValue.value;
      }
    } catch (e) {
      // If parsing fails, do not display this attribute
      displayValue = null;
    }

    // Return null if there's no value to display
    if (displayValue === null) {
      return null;
    }

    return { displayKey, displayValue };
  };

  // Prepare data for the chart
  const chartData = Object.keys(device)
    .filter((key) => key.toLowerCase().includes("value"))
    .splice(0, 5)
    .map((key) => {
      const parsedAttribute = parseAttribute(key, JSON.stringify(device[key]));
      if (parsedAttribute) {
        return {
          name: parsedAttribute.displayKey,
          value: parsedAttribute.displayValue,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Attributes Section */}
      <div className="overflow-auto rounded md:h-[70%]">
        <div className="grid grid-cols-2 gap-3 auto-rows-auto">
          <DeviceAttribute
            key={"type"}
            attributeKey={"DEVICE"}
            attributeValue={device.type}
            isOpen={openMenuKey === "type"}
            onToggleMenu={() => handleMenuToggle("type")}
            onCloseMenu={() => setOpenMenuKey(null)}
          />
          {Object.keys(device).map((key) => {
            const parsedAttribute = parseAttribute(
              key,
              JSON.stringify(device[key])
            );
            if (parsedAttribute) {
              // Check if the attribute is not null
              const { displayKey, displayValue } = parsedAttribute;
              return (
                <DeviceAttribute
                  key={key}
                  attributeKey={displayKey.toUpperCase()}
                  attributeValue={displayValue}
                  isOpen={openMenuKey === key}
                  onToggleMenu={() => handleMenuToggle(key)}
                  onCloseMenu={() => setOpenMenuKey(null)}
                  darkMode = {darkMode}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Charts Section */}
      {device.type === "AirQualitySensor" && (
        <div className="md:h-[30%] ml-[-20px] mb-4 flex">
          {chartData.map((data, index) => (
            <BarChart key={index} data={data} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Device;
