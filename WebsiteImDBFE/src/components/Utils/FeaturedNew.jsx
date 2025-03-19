import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FaRegImages } from 'react-icons/fa';

const featuredItems = [
    {
        title: "Staff Picks: What to Watch in March",
        link: "See our picks",
        images: [
            "https://m.media-amazon.com/images/M/MV5BMDRiNTBlY2EtZmRiZC00Mzc4LTljZDctNWQ5ZGY2NjUwNjE4XkEyXkFqcGc@._V1_.jpg", 
            "https://upload.wikimedia.org/wikipedia/vi/2/23/MICKEY_17_%E2%80%93_Vietnam_poster.jpg", 
            "https://resizing.flixster.com/jCjw8tUz-XUzuNzB7e3L60WQZ-0=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvOTE4ZjhlNDEtMmNiOS00MGVmLTkyYjMtYzU3N2FlOWI1MDljLmpwZw=="
        ], // 3 ảnh nhỏ gộp thành banner
        type: "list",
    },
    {
        title: "On the Scene at SXSW 2025",
        link: "See the gallery",
        images: [
            "https://via.placeholder.com/150/444", 
            "https://via.placeholder.com/150/555", 
            "https://via.placeholder.com/150/666"
        ],
        type: "photos",
    }
];

const FeaturedNew = () => {
    return (
        <div className="w-full bg-black text-white p-5">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-yellow-500 mb-4">Featured today</h2>

            {/* Danh sách featured */}
            <div className="flex space-x-4 overflow-x-auto">
                {featuredItems.map((item, index) => (
                    <div key={index} className="w-80 bg-[#111] rounded-lg shadow-lg overflow-hidden">
                        {/* Banner 3 ảnh gộp lại */}
                        <div className="grid grid-cols-3 gap-0 w-full h-40 overflow-hidden">
                            {item.images.map((img, idx) => (
                                <img key={idx} src={img} alt={`Feature ${index}`} className="w-full h-full object-cover" />
                            ))}
                        </div>

                        {/* Nội dung */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold">{item.title}</h3>
                            <a href="/detailNews" className="text-blue-400 text-sm hover:underline">
                                {item.link}
                            </a>
                        </div>
                    </div>
                ))}

                {/* Nút mũi tên */}
                <div className="flex items-center justify-center">
                    <button className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700"
                    aria-label='Next news'>
                        <FaChevronRight className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedNew;
