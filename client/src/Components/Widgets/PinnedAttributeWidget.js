import React, { useContext, useState, useEffect } from "react";
import CountUp from "react-countup";

const PinnedAttributeWidget = ({ socket, devices }) => {
  const [pinnedAttribute, setPinnedAttribute] = useState([]);
  const [attributeValue, setAttributeValue] = useState(0);
  // Listen for the filtered data from the server
  useEffect(() => {
    socket.on("pinnedAttribute", (data) => {
      console.log("Pinned Attribute Data:", data);
      setPinnedAttribute(data);
      setAttributeValue(data.attributeValue);
    });

    const device = devices.find(
      (device) =>
        device.id.split(":").slice(-2).join(":") === pinnedAttribute.deviceID
    );
    if (device) {
      const attribute = device[pinnedAttribute.attributeKey];
      console.log("Pinned Attribute:", attribute);
      setAttributeValue(attribute.value);
		};

    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("pinnedAttribute");
    };
  }, [socket, devices]);

  return (
    <div className="bg-gradient-to-r from-sky-100 to-blue-200 p-4 w-full md:w-[15%] flex items-center shadow rounded h-[70px]">
      <p className="p-3 whitespace-nowrap font-mono rounded-full w-fit h-7 font-bold bg-[#304463] text-cyan-200 flex items-center justify-center mr-2">
        <CountUp decimals={2} end={attributeValue} duration={3} />
      </p>
      <p className="color-[#304463] font-bold">
        {pinnedAttribute.attributeKey}
      </p>
    </div>
  );
};

export default PinnedAttributeWidget;
