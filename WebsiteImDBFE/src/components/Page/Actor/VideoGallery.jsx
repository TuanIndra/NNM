import React from "react";

const VideoGallery = () => {
    const videos = [
        {
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            title: "Behind the Scenes",
        },
        {
            url: "https://www.w3schools.com/html/movie.mp4",
            title: "Exclusive Interview",
        },
        {
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            title: "Red Carpet Moment",
        },
        {
            url: "https://www.w3schools.com/html/movie.mp4",
            title: "Press Conference",
        },
        {
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            title: "Movie Trailer",
        },
        {
            url: "https://www.w3schools.com/html/movie.mp4",
            title: "Fan Event Highlights",
        },
    ];

    return (
        <div className="w-[856px] h-[500px]">
            {/* Tiêu đề */}
            <div className="flex items-center space-x-2 border-b pb-2">
                <span className="text-yellow-500 font-semibold text-lg">|</span>
                <h2 className="text-2xl font-bold text-black">Videos</h2>
                <span className="text-gray-400 text-sm">{videos.length}</span>
            </div>

            {/* Grid Video */}
            <div className="grid gap-2 mt-4 w-full h-[450px]">
                {/* Hàng trên: 2 cột */}
                <div className="grid grid-cols-2 gap-2 h-1/2">
                    {videos.slice(0, 2).map((video, index) => (
                        <div key={index} className="relative w-[396px] h-[233px]">
                            <video
                                src={video.url}
                                controls
                                className="rounded-md shadow-sm object-cover w-full h-[85%]"
                            />
                            <p className="text-center text-sm font-semibold mt-1 text-black">{video.title}</p>
                        </div>
                    ))}
                </div>

                {/* Hàng dưới: 4 cột */}
                <div className="grid grid-cols-4 gap-2 h-1/2">
                    {videos.slice(2, 6).map((video, index) => (
                        <div key={index} className="relative w-[190px] h-[107]">
                            <video
                                src={video.url}
                                controls
                                className="rounded-md shadow-sm object-cover w-full h-[85%]"
                            />
                            <p className="text-center text-xs font-medium mt-1 text-black">{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
