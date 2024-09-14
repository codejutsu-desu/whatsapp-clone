import React from "react";
import { Search, Paperclip, EllipsisVertical } from "lucide-react";
import Image from "next/image";

export default function ChatHeader() {
  const profileImageSrc = "https://via.placeholder.com/150";
  const profileName = "Shimanto Haque";
  const iconColor = "#263238";

  return (
    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
          <Image
            className="w-10 h-10 rounded-full"
            src={profileImageSrc}
            alt="Profile Picture"
            width={40}
            height={40}
          />
        </div>
        <div className="ml-4">
          <p className="text-grey-darkest">{profileName}</p>
        </div>
      </div>

      <div className="flex">
        <div>
          <Search color={iconColor} />
        </div>
        <div className="ml-6">
          <Paperclip color={iconColor} />
        </div>
        <div className="ml-6">
          <EllipsisVertical color={iconColor} />
        </div>
      </div>
    </div>
  );
}
