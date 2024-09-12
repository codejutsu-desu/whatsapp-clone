import React from "react";

interface MessageProps {
  message: string;
  time: string;
  isSent: boolean;
}

export default function Message({ message, time, isSent }: MessageProps) {
  const messageStyle = isSent
    ? { backgroundColor: "#E2F7CB" }
    : { backgroundColor: "#F2F2F2" };

  // Trim any leading/trailing whitespace for accurate checking
  const trimmedMessage = message.trim();

  // Detect if the message is an audio blob URL
  const isAudioMessage =
    trimmedMessage.startsWith("blob:") ||
    trimmedMessage.includes(".wav") ||
    trimmedMessage.includes(".mp3") ||
    trimmedMessage.includes(".ogg");

  console.log("Message Received:", message);
  console.log("Is Audio Message:", isAudioMessage);

  return (
    <div className={`flex mb-2 ${isSent ? "justify-end" : "justify-start"}`}>
      <div className="rounded py-2 px-3 max-w-xs" style={messageStyle}>
        {isAudioMessage ? (
          <audio controls>
            <source src={message} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className="text-sm mt-1">{message}</p>
        )}
        <p className="text-right text-xs text-grey-dark mt-1">{time}</p>
      </div>
    </div>
  );
}
