import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatComponent = () => {
  return (
    <div className="w-2/3 mx-auto border flex flex-col">
      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </div>
  );
};

export default ChatComponent;
