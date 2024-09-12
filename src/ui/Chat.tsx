"use client";

import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { Message as MessageType } from "@/interface/messages";

const ChatComponent = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = (newMessage: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="w-2/3 mx-auto border flex flex-col">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatComponent;
