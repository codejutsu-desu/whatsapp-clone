"use client";
import React, { useState, useRef } from "react";
import { SendHorizontal, Mic } from "lucide-react";
import { Message as MessageType } from "@/interface/messages";

interface ChatInputProps {
  onSendMessage: (message: MessageType) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        const recordedMessage = {
          sender: { name: "You", color: "text-green-500" },
          message: `${audioUrl}`,
          time: new Date().toLocaleTimeString(),
          isSent: true,
        };

        onSendMessage(recordedMessage);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
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
          onKeyPress={handleKeyPress}
        />
      </div>

      {input ? (
        <SendHorizontal className="cursor-pointer" onClick={sendMessage} />
      ) : isRecording ? (
        <div className="cursor-pointer text-red-500" onClick={stopRecording}>
          Stop Recording
        </div>
      ) : (
        <Mic className="cursor-pointer" onClick={startRecording} />
      )}
    </div>
  );
}
