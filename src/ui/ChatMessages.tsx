import React from "react";
import Message from "./Message";
import { Message as MessageType } from "@/interface/messages";

interface ChatMessagesProps {
  messages: MessageType[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  console.log(messages);
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
            <p className="text-sm uppercase">February 20, 2021</p>
          </div>
        </div>

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
