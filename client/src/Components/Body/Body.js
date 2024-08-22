import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Initialize the WebSocket connection (replace with your server URL)
const socket = io('http://localhost:5000');

const Body = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Listen for 'devices' events from the server
    socket.on('devices', (data) => {
      setDevices(data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('devices');
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="flex-[0.7] h-64 md:h-auto p-4">
        <div className="p-[10px] h-[700px] w-full bg-gray-400">
          Map Container
        </div>
      </div>

      <div className="flex-[0.3] h-64 md:h-auto p-4">
        <div className="p-[10px] h-full w-full bg-gray-100">
          <h2>Device Information</h2>
          <ul>
            {devices.map((device, index) => (
              <li key={index}>
                {device.name} - {device.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Body;
