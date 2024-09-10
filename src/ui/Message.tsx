import React from "react";

export default function Message({ sender, message, time, isSent }) {
  const messageStyle = isSent
    ? { backgroundColor: "#E2F7CB", justifySelf: "end" }
    : { backgroundColor: "#F2F2F2" };

  return (
    <div className={`flex mb-2 ${isSent ? "justify-end" : ""}`}>
      <div className="rounded py-2 px-3" style={messageStyle}>
        {sender && <p className={`text-sm ${sender.color}`}>{sender.name}</p>}
        <p className="text-sm mt-1">{message}</p>
        <p className="text-right text-xs text-grey-dark mt-1">{time}</p>
      </div>
    </div>
  );
}
