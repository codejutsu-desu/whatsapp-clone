import React from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      {/* <Icon name="media" /> */}
      <div className="flex-1 mx-4">
        <input
          className="w-full border rounded-full px-2 py-2"
          type="text"
          placeholder="Type a message..."
        />
      </div>
      <SendHorizontal />
    </div>
  );
}
