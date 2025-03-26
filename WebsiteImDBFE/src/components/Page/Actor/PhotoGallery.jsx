import React from "react";

const PhotoGallery = ({ photos }) => {
    return (
        <div className="w-[856px] h-[453px]">
            <div className="flex items-center space-x-2 border-b pb-2">
                <span className="text-yellow-500 font-semibold text-lg">|</span>
                <h2 className="text-2xl font-bold text-black">Photos</h2>
                <span className="text-gray-400 text-sm">{photos?.length || 0}</span>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-2 mt-4 w-full h-[400px]">
                {photos && photos.length > 0 ? (
                    photos.slice(0, 6).map((photo, index) => (
                        <div key={index} className="relative w-full h-full">
                            <img
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="rounded-md shadow-sm object-cover w-full h-full"
                            />
                            {index === 5 && photos.length > 6 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center rounded-md">
                                    <span className="text-white font-bold text-xl">+{photos.length - 6}</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;