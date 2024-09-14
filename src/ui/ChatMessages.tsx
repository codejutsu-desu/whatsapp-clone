import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { Message as MessageType } from "@/interface/messages";

interface ChatMessagesProps {
  messages: MessageType[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatBackgroundColor = "#DAD3CC";
  const dateBackgroundColor = "#DDECF2";
  const notificationBackgroundColor = "#FCF4CB";
  const chatDate = "February 20, 2024";
  const notificationText =
    "Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.";

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: chatBackgroundColor }}
    >
      <div className="py-2 px-3">
        {/* Date */}
        <div className="flex justify-center mb-2">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: dateBackgroundColor }}
          >
            <p className="text-sm uppercase">{chatDate}</p>
          </div>
        </div>

        {/* Notification */}
        <div className="flex justify-center mb-4">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: notificationBackgroundColor }}
          >
            <p className="text-xs">{notificationText}</p>
          </div>
        </div>

        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg.message}
            time={msg.time}
            isSent={msg.isSent}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
