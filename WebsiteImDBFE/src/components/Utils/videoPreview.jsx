import React, { useState } from 'react';

const VideoPreview = ({ videoUrl, thumbnailUrl, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <video 
          src={videoUrl} 
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
      )}
      
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
        {title}
      </div>
    </div>
  );
};

export default VideoPreview;
