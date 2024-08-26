import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Device from "./Device/Device.js";
import DeviceNode from "./Device/DeviceNode.js"; // Import the DeviceNode component

// Initialize the WebSocket connection (replace with your server URL)
const socket = io("http://localhost:5000");

const Body = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Listen for 'devices' events from the server
    socket.on("devices", (data) => {
      setDevices(data);

      // Automatically update the selected device data if it is still in the list
      if (selectedDevice) {
        const updatedDevice = data.find((device) => device.id === selectedDevice.id);
        if (updatedDevice) {
          setSelectedDevice(updatedDevice);
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("devices");
    };
  }, [selectedDevice]);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div className="flex flex-col md:flex-row h-[900px] gap-4 p-4">
      <div className="w-full md:w-[70%]">
        <div className="p-4 h-full bg-gray-100 relative rounded ">
          {devices.map((device, index) => (
            <DeviceNode
              key={device.id}
              device={device}
              index={index}
              onClick={handleDeviceClick} // Pass the click handler as a prop
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-[30%] gap-5">
        <div className="p-4 w-full h-full bg-gray-100 rounded">
          <h1 className="text-lg font-bold p-2">DEVICE ATTRIBUTES</h1>
          {selectedDevice ? (
            <Device device={selectedDevice} />
          ) : (
            <p>Select a device to see its details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
