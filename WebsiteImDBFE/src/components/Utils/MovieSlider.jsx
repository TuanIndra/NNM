import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from './MovieCard';

const MovieSlider = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
    };

    return (
        <div className="w-full px-5 py-5">
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <div key={index} className="px-2">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MovieSlider;
