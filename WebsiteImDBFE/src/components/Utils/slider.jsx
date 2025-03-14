import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Main from '../../assets/main.jpg';


const ImageSlider = () => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/actors")  // 🔹 Thay URL bằng API đúng
            .then(response => response.json())
            .then(data => {
                console.log(" Dữ liệu diễn viên:", data); // ✅ Debug dữ liệu
                setActors(data);
            })
            .catch(error => console.error("Lỗi khi fetch API:", error));
    }, []);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className='w-full px-5 py-5'>
            <Slider {...settings}>
                {actors.map(actor => (
                    <a href='/actor'>
                        <div key={actor._id} className='px-2'>
                            <img
                                src={actor.profileImage || 'https://via.placeholder.com/150'}
                                alt={actor.name}
                                className='w-40 h-40 object-cover rounded-full border-2 border-gray-500 mx-auto'
                            />
                            <p className="text-center mt-2 font-semibold text-white">{actor.name}</p>
                        </div>
                    </a>

                ))}
            </Slider>
        </div>
    );
}

export default ImageSlider;
