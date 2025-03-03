import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Main from '../../assets/main.jpg';

const ImageSlider = () => {
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
                <div className='px-2'>
                    <img src={Main} alt='Anh slider' className='w-40 h-60 object-cover rounded-2xl' />
                </div>
                <div className='px-2'>
                    <img src={Main} alt='Anh slider' className='w-40 h-60 object-cover rounded-2xl' />
                </div>
                <div className='px-2'>
                    <img src={Main} alt='Anh slider' className='w-40 h-60 object-cover rounded-2xl' />
                </div>
                <div className='px-2'>
                    <img src={Main} alt='Anh slider' className='w-40 h-60 object-cover rounded-2xl' />
                </div>
            </Slider>
        </div>
    );
}

export default ImageSlider;
