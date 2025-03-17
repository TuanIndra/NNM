import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import Main from "../../assets/main.jpg";

const ImageSlider = () => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/actors")
            .then((response) => {
                if (!response.ok) throw new Error("Lỗi khi tải danh sách diễn viên");
                return response.json();
            })
            .then((data) => {
                console.log("Dữ liệu diễn viên:", data); // Debug dữ liệu
                setActors(data);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch API:", error);
                toast.error("Lỗi khi tải danh sách diễn viên!");
            });
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

    // Hàm xử lý fallback khi ảnh không tải được
    const handleImageError = (e) => {
        e.target.src = "https://picsum.photos/150"; // URL thay thế
        e.target.onerror = null; // Ngăn lặp lại lỗi
    };

    return (
        <div className="w-full px-5 py-5">
            <Slider {...settings}>
                {actors.map((actor) => (
                    <Link to={`/actor/${actor._id}`} key={actor._id} className="block px-2">
                        <div className="px-2">
                            <img
                                src={actor.profileImage || "https://picsum.photos/150"}
                                alt={actor.name}
                                className="w-40 h-40 object-cover rounded-full border-2 border-gray-500 mx-auto"
                                onError={handleImageError} // Xử lý lỗi tải ảnh
                            />
                            <p className="text-center mt-2 font-semibold text-white">{actor.name}</p>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;