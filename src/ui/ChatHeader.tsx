import React from "react";
import { Search, Paperclip, EllipsisVertical } from "lucide-react";
import Image from "next/image";

export default function ChatHeader() {
  return (
    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
          <Image
            className="w-10 h-10 rounded-full"
            src=""
            alt="Profile Picture"
            width={40}
            height={40}
          />
        </div>
        <div className="ml-4">
          <p className="text-grey-darkest">Shimanto Haque</p>
        </div>
      </div>

      <div className="flex">
        <div>
          <Search color="#263238" />
        </div>
        <div className="ml-6">
          <Paperclip color="#263238" />
        </div>
        <div className="ml-6">
          <EllipsisVertical color="#263238" />
        </div>
      </div>
    </div>
  );
}
