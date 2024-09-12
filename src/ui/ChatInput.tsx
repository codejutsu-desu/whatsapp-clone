"use client";
import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Message as MessageType } from "@/interface/messages"; // Import the Message type

interface ChatInputProps {
  onSendMessage: (message: MessageType) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = {
      sender: { name: "You", color: "text-green-500" },
      message: input,
      time: new Date().toLocaleTimeString(),
      isSent: true,
    };
    onSendMessage(userMessage);

    const res = await fetch("/api/getMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const serverMessage = {
      sender: { name: "Server", color: "text-blue-500" },
      message: data.message,
      time: new Date().toLocaleTimeString(),
      isSent: false,
    };

    onSendMessage(serverMessage);

    // Clear input
    setInput("");
  };

  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <div className="flex-1 mx-4">
        <input
          className="w-full border rounded-full px-2 py-2"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <SendHorizontal className="cursor-pointer" onClick={sendMessage} />
    </div>
  );
}
