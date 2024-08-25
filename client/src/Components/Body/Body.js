import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Device from "./Device/Device.js"; // Import the Device component

// Initialize the WebSocket connection (replace with your server URL)
const socket = io("http://localhost:5000");

const Body = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Listen for 'devices' events from the server
    socket.on("devices", (data) => {
      setDevices(data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("devices");
    };
  }, []);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  const DeviceCircle = ({ device, index }) => {
    return (
      <div
        onClick={() => handleDeviceClick(device)}
        className="cursor-pointer"
        style={{
          position: "absolute",
          left: `${index * 40 + 10}px`, // Staggered positioning for visual distinction
          top: "20px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "blue",
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

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-[70%] h-64 md:h-auto p-4 relative">
        <div className="p-[10px] h-[800px] bg-gray-100 relative rounded ">
          {devices.map((device, index) => (
            <DeviceCircle key={device.id} device={device} index={index} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-[30%] h-64 md:h-auto p-4">
        <div className="p-[10px] h-[800px] w-full bg-gray-100 overflow-auto rounded ">
          <h2 className="text-lg font-bold">Device Information</h2>
          <div>
            {selectedDevice ? (
              <Device device={selectedDevice} />
            ) : (
              <p>Select a device to see its details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
