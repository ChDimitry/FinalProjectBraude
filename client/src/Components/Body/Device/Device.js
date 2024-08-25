import React, { useState } from "react";
import DeviceParameter from "./DeviceParameter"; // Import the DeviceParameter component

const Device = ({ device }) => {
  const [openMenuKey, setOpenMenuKey] = useState(null); // Track the open menu

  const handleMenuToggle = (key) => {
    setOpenMenuKey(openMenuKey === key ? null : key); // Toggle the menu
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(device).map((key) => (
        <DeviceParameter
          key={key}
          parameterKey={key}
          parameterValue={JSON.stringify(device[key])}
          isOpen={openMenuKey === key}
          onToggleMenu={() => handleMenuToggle(key)}
          onCloseMenu={() => setOpenMenuKey(null)}
        />
      ))}
    </div>
  );
};

export default Device;
