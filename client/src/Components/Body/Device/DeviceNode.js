// DeviceNode.js
import React from "react";

const DeviceNode = ({ device, index, onClick }) => {
  return (
    <div
      onClick={() => onClick(device)}
      className="cursor-pointer"
      style={{
        position: "absolute",
        left: `${index * 40 + 10}px`, // Staggered positioning for visual distinction
        top: "20px",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: "#304463",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      {device.type[0]}
    </div>
  );
};

export default DeviceNode;
