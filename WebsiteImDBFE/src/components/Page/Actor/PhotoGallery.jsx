import React from "react";

const PhotoGallery = () => {
    const photos = [
        "https://vcdn1-giaitri.vnecdn.net/2022/05/25/Tom-Cruise-Top-Gun-Maverick-5974-1653482336.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTffh9g-tXI_YOD5YNm2VQ",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4RAZJl-4DkN6QLEHgbzT-b9dWv3ZDEY21A&s",
        "https://cdn.thuonggiaonline.vn/images/9ab7e0d79d3cfb93360377d8dbf39426d96cb33bf90c40670b0a65626c390e31c1c70582ccca676345018cc5766332a78fea7128062454f4827228cca49397479d5c56ce21518500cb74da86dbcd6e58/top-gun-maverick-bande-annonce-finale.jpg",
        "https://thanhnien.mediacdn.vn/Uploaded/sangdt/2022_05_28/top-gun-2-8029.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwiuj3nrII_ESKeK2hmgBPCzCunBHRzsDkbA&s",
        "https://i.ytimg.com/vi/NOhDyUmT9z0/maxresdefault.jpg",
    ];

    return (
        <div className="w-[856px] h-[453px]">
            {/* Tiêu đề */}
            <div className="flex items-center space-x-2 border-b pb-2">
                <span className="text-yellow-500 font-semibold text-lg">|</span>
                <h2 className="text-2xl font-bold text-black">Photos</h2>
                <span className="text-gray-400 text-sm">2032</span>
            </div>

            {/* Grid ảnh */}
            <div className="grid grid-cols-3 grid-rows-2 gap-2 mt-4 w-full h-[400px]">
                {photos.slice(0, 6).map((photo, index) => (
                    <div key={index} className="relative w-full h-full">
                        <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="rounded-md shadow-sm object-cover w-full h-full"
                        />
                        {/* Ảnh cuối cùng hiển thị số lượng ảnh còn lại */}
                        {index === 5 && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center rounded-md">
                                <span className="text-white font-bold text-xl">+2K</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
