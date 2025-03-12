import React from 'react';
import { useNavigate } from 'react-router-dom';
import SampleVideo from '../../assets/sample.mp4';
//import Thumbnail from '../../assets/thumbnail.jpg'; // Ảnh đại diện cho video
import Banner2 from '../../assets/banner2.png'
import Navbar from '../Navbar/Navbar';
import { IoIosArrowForward } from "react-icons/io";
import MovieSlider from '../Utils/MovieSlider';
import FeaturedVideos from '../Utils/FeaturedVideo';
const moviesData = [
    { title: "Khu Nghỉ Dưỡng Hoa Sen Trắng", image: "https://m.media-amazon.com/images/M/MV5BZmM1MGM0MDQtZTAzNy00ZGJkLWI4MDUtNjBmMzdhYjhlM2QwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", rating: 8.0 },
    { title: "Phim 2", image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/c/a/captain_america_th_gi_i_m_i_-_official_poster.jpg", rating: 7.5 },
    { title: "Phim 3", image: "/path/to/image3.jpg", rating: 9.2 },
    { title: "Phim 4", image: "/path/to/image4.jpg", rating: 7.8 },
    { title: "Phim 5", image: "/path/to/image5.jpg", rating: 8.5 },
  ];
const TrailerPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                {/* Wrapper chứa Video + Sidebar */}
                <div className="flex space-x-6">
                    {/* Video Player */}
                    <div className="flex flex-col w-[70%]">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg font-semibold text-white mb-4  px-4 py-2 rounded-md w-fit"
                        >
                            Quay lại
                        </button>
                        <video controls autoPlay className="w-full h-[460px] max-w-4xl rounded-lg shadow-lg">
                            <source src={SampleVideo} type="video/mp4" />
                            Trình duyệt của bạn không hỗ trợ video.
                        </video>
                    </div>

                    {/* Right Sidebar */}
                    <div className=" self-start w-[30%] bg-[#121212] p-4 rounded-lg shadow-lg h-[500px]  flex flex-col items-start py-4 ">
                        <div className=' flex flex-row'>
                            <img
                                src={Banner2}
                                alt="Thumbnail"
                                className="w-20 h-28 object-cover rounded-lg"
                            />

                            {/* Thông tin video */}
                            <h2 className="text-white text-lg font-semibold ml-5">Nhà gia tiên</h2>
                            <a href="#" className="ml-20 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-gray-700">
                                <IoIosArrowForward color="white" />
                            </a>
                        </div>
                        <hr className="border-t border-gray-500 my-4 w-full" />
                        <p className="text-gray-300 text-sm mt-2 text-center">
                            Bộ phim lấy bối cảnh hậu tận thế, theo chân Joel và Ellie trong hành trình sinh tồn giữa dịch bệnh.
                        </p>
                    </div>
                    {/* Ảnh đại diện */}

                </div>
                <div>
                    <FeaturedVideos></FeaturedVideos>
                </div>
            </div>
        </div>
    );
};

export default TrailerPage;
