import React from 'react';
import Main from '../../assets/main.jpg';
import SampleVideo from '../../assets/sample.mp4'
import UpNext from './upNext'

const MainPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start space-x-6">
        <video 
          src={"https://www.youtube.com/watch?v=hXGozmNBwt4&t=90s"} 
          className="w-[60%] h-[450px] object-cover rounded-lg shadow-md"
          controls
          autoPlay
          loop
          muted
        />
        <div className="w-[40%]">
          <UpNext />
        </div>
      </div>
    </div>
  );
};

export default MainPage;