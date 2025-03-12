import React from 'react';
import { useNavigate } from 'react-router-dom';
import SampleVideo from '../../assets/sample.mp4'
import Navbar from '../Navbar/Navbar';

const TrailerPage = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-black'>
            <Navbar></Navbar>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex flex-col justify-start items-start h-screen ">
                    <button onClick={() => navigate(-1)} className="text-2xl mt-5 mb-5 font-semibold text-white">
                        Quay lại
                    </button>
                    <video controls autoPlay className="w-[80%] max-w-4xl">
                        <source src={SampleVideo} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </div>
            </div>

        </div>

    );
};

export default TrailerPage;
