import React from "react";

interface Sender {
  name: string;
  color?: string;
}

interface MessageProps {
  sender?: Sender | null;
  message: string;
  time: string;
  isSent: boolean;
}

export default function Message({
  sender,
  message,
  time,
  isSent,
}: MessageProps) {
  console.log(sender);
  const messageStyle = isSent
    ? { backgroundColor: "#E2F7CB" }
    : { backgroundColor: "#F2F2F2" };

  return (
    <div className={`flex mb-2 ${isSent ? "justify-end" : "justify-start"}`}>
      <div className="rounded py-2 px-3 max-w-xs" style={messageStyle}>
        <p className="text-sm mt-1">{message}</p>
        <p className="text-right text-xs text-grey-dark mt-1">{time}</p>
      </div>
    </div>
  );
}
