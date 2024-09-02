import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Device from "./Device/Device.js";
import DeviceNode from "./Device/DeviceNode.js";


import ServerSpeedWidget from "../Widgets/ServerSpeedWidget.js";
import ActiveDevicesWidget from "../Widgets/ActiveDevicesWidget.js";

// Initialize the WebSocket connection (replace with your server URL)
const socket = io("http://localhost:5000");

const Body = ({ darkMode }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [transferSpeeds, setTransferSpeeds] = useState([]);

  useEffect(() => {
    // Listen for 'devices' events from the server
    socket.on("devices", (data) => {
      setDevices(data);

      // Automatically update the selected device data if it is still in the list
      if (selectedDevice) {
        const updatedDevice = data.find(
          (device) => device.id === selectedDevice.id
        );
        if (updatedDevice) {
          setSelectedDevice(updatedDevice);
        }
      }
    });

    // Listen for 'transferSpeed' events from the server
    socket.on("transferSpeed", (speed) => {
      setTransferSpeeds((prevSpeeds) => {
        const updatedSpeeds = [
          ...prevSpeeds,
          { time: new Date().toLocaleTimeString(), speed },
        ];
        return updatedSpeeds.length > 50
          ? updatedSpeeds.slice(-50)
          : updatedSpeeds; // Keep only the last 10 values
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.off("devices");
      socket.off("transferSpeed");
    };
  }, [selectedDevice]);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <ActiveDevicesWidget devices={devices} />
        <ServerSpeedWidget transferSpeeds={transferSpeeds} />
        {/* <div className="bg-gradient-to-r from-sky-100 to-blue-200 p-4 w-full md:w-[10%] flex items-center shadow rounded h-[70px]"></div>
        <div className="bg-gradient-to-r from-indigo-100 to-cyan-100 p-4 w-full md:w-[20%] flex items-center shadow rounded h-[70px]"></div>
        <div className="bg-gradient-to-r from-blue-100 to-sky-200 p-4 w-full md:w-[30%] flex items-center shadow rounded h-[70px]"></div> */}
      </div>

      <div className="flex flex-col md:flex-row h-[900px] gap-4 p-4">
        <div className="w-full md:w-[20%]">
          <div className={`p-4 h-full ${ darkMode ? "bg-[#304463] rounded" : "bg-gray-100 rounded"}`}>
            <h1 className={`text-lg text-${ darkMode ? "[#ffffff]" : "[#304463]"} font-bold p-2`}>DEVICES</h1>
            <table className="table-fixed">
              <thead className="">
                <tr>
                  <th className="text-left p-2 ">#</th>
                  <th className="text-left p-1">ID</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-right p-2">Show</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => {
                  const parsedId = device.id.split(":").slice(-2).join(":");
                  const isSelected = device === selectedDevice;
                  return (
                    <tr
                      key={device.id}
                      className="cursor-pointer border-t border-dashed h-[40px] border-gray-200 rounded-lg"
                      style={{
                        backgroundColor: isSelected ? "rgba(0,0,0,0.03)" : "",
                        borderLeft: isSelected ? "2px solid #304463" : "",
                      }}
                      onClick={() => handleDeviceClick(device)}
                    >
                      <td className="p-2 font-light">{index}</td>
                      <td className="p-1 font-light">{parsedId}</td>
                      <td className="p-2">{device.type}</td>
                      <td className="p-2 text-right">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 accent-[#304463]"
                          defaultChecked={true}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full md:w-[55%]">
        <div className={`p-4 h-full relative ${ darkMode ? "bg-[#304463] bg-mapDark" : "bg-white bg-map"} bg-contain bg-no-repeat bg-center border-2 rounded border border-indigo-100`}>
          {devices &&
              devices.length > 0 &&
              devices.map((device, index) => {
                const positions = {
                  0: [30, 75],
                  1: [40, 75],
                  2: [50, 10],
                  3: [25, 80],
                  4: [28, 72],
                  5: [22, 70],
                  6: [25, 75],
                  7: [35, 80],
                  8: [35, 70],
                  9: [60, 60],
                };


                const position = positions[index] || [0, 0]; // Default position if undefined
                const isSelected = device === selectedDevice;
                return (
                  <DeviceNode
                    key={device.id}
                    device={device}
                    index={index}
                    onClick={handleDeviceClick}
                    style={{
                      left: `${position[0]}%`,
                      top: `${position[1]}%`,
                      borderWidth: isSelected ? "0px" : "4px",
                    }}
                  />
                );
              })}
          </div>
        </div>

        <div className="w-full md:w-[25%]">
          <div
            className={`z-10 p-4 h-full ${
              darkMode ? "bg-[#304463] rounded" : "bg-gray-100 rounded"
            }`}
          >
            <div className="flex justify-between mb-3 items-center">

              <h1 className={`text-lg text-${ darkMode ? "[#ffffff]" : "[#304463]"} font-bold p-2`}>DEVICE ATTRIBUTES</h1>
              {selectedDevice && (
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="text-gray-900 border border-gray-200 focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-100 rounded text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Close
                </button>
              )}
            </div>
            {selectedDevice ? (
              <Device device={selectedDevice} darkMode={darkMode} />
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
