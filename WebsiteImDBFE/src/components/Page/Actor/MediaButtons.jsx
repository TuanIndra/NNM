import React from "react";
import { Video, Image } from "lucide-react"; // Import icon từ lucide-react

const MediaButtons = () => {
    return (
        <div className="flex flex-col space-y-2 w-[208px] h-[414px] mt-4">
            {/* Video Button */}
            <div className="bg-black/40 rounded-lg w-full h-[202px] flex flex-col items-center justify-center text-white p-4">
                <Video size={32} className="mb-2" />
                <span className="text-sm font-semibold">99+ VIDEOS</span>
            </div>

            {/* Photos Button */}
            <div className="bg-black/40 rounded-lg w-full h-[202px] flex flex-col items-center justify-center text-white p-4">
                <Image size={32} className="mb-2" />
                <span className="text-sm font-semibold">99+ PHOTOS</span>
            </div>
        </div>
    );
};

export default MediaButtons;
