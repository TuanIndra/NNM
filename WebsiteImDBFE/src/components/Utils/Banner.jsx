import React from 'react'
import Banner2 from '../../assets/banner2.png'
import Main from '../../assets/main.jpg';
import { FaRegPlayCircle } from "react-icons/fa";
const Banner = () => {
    return (
        
        <div className='relative w-full flex justify-center'>
            <img
                src={Banner2}
                className="w-full h-[500px] object-cover rounded-lg shadow-md bg-transparent"
            />
            <div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/100 to-transparent'></div>
   

{/* Thẻ chứa icon và chữ */}
            {/*Edit banner bên trái */}
            <div className='absolute left-5 bottom-2 w-[60%] h-auto text-white flex items-end justify-start shadow-lg rounded-lg p-4 bg-transparent'>
                <img src={Main} alt="Banner" className='w-35 h-55 object-cover rounded-lg'></img>
                <div>
                    <FaRegPlayCircle className='ml-5 w-20 h-20 hover:text-orange-300 transition cursor-pointer'></FaRegPlayCircle>
                </div>
                <div className='ml-5 text-lg font-bold break-words flex-1'>
                    Nhà gia tiên fsadjkskjasflasfklasfklasflksaflasflasfklasflasf
                    xem ngay hôm nay
                </div>
       
            </div>

        </div>
    )
}

export default Banner
