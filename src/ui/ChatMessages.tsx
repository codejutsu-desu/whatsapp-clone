import React from "react";
import Message from "./Message";

export default function ChatMessages() {
  const messages = [
    {
      sender: { name: "Sylvester Stallone", color: "text-teal" },
      message: "Hi everyone! Glad you could join! I am making a new movie.",
      time: "12:45 pm",
    },
    {
      sender: { name: "Tom Cruise", color: "text-purple" },
      message: "Hi all! I have one question for the movie",
      time: "12:45 pm",
    },
    {
      sender: { name: "Harrison Ford", color: "text-orange" },
      message: "Again?",
      time: "12:45 pm",
    },
    {
      sender: { name: "Russell Crowe", color: "text-orange" },
      message: "Is Andrés coming for this one?",
      time: "12:45 pm",
    },
    {
      sender: { name: "Sylvester Stallone", color: "text-teal" },
      message: "He is. Just invited him to join.",
      time: "12:45 pm",
    },
    { message: "Glad to be here! :D", time: "12:45 pm", isSent: true },
  ];
  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: "#DAD3CC" }}
    >
      <div className="py-2 px-3">
        {/* Date */}
        <div className="flex justify-center mb-2">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: "#DDECF2" }}
          >
            <p className="text-sm uppercase">February 20, 2018</p>
          </div>
        </div>

        {/* Encryption Notice */}
        <div className="flex justify-center mb-4">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: "#FCF4CB" }}
          >
            <p className="text-xs">
              Messages to this chat and calls are now secured with end-to-end
              encryption. Tap for more info.
            </p>
          </div>
        </div>

        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            message={msg.message}
            time={msg.time}
            isSent={msg.isSent}
          />
        ))}
      </div>
    </div>
  );
}
