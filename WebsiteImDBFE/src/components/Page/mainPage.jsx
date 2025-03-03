import React from 'react';

import SampleVideo from '../../assets/sample.mp4'
import UpNext from './upNext'
import Slider from './../Utils/slider'
import Banner from '../Utils/banner';
import MovieSlider from '../Utils/MovieSlider';

const moviesData = [
  { title: "Khu Nghỉ Dưỡng Hoa Sen Trắng", image: "https://m.media-amazon.com/images/M/MV5BZmM1MGM0MDQtZTAzNy00ZGJkLWI4MDUtNjBmMzdhYjhlM2QwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", rating: 8.0 },
  { title: "Phim 2", image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/c/a/captain_america_th_gi_i_m_i_-_official_poster.jpg", rating: 7.5 },
  { title: "Phim 3", image: "/path/to/image3.jpg", rating: 9.2 },
  { title: "Phim 4", image: "/path/to/image4.jpg", rating: 7.8 },
  { title: "Phim 5", image: "/path/to/image5.jpg", rating: 8.5 },
];
const MainPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <a href='#' className='bg-blue-500 rounded-lg shadow-md transition duration-300 hover:shadow-2xl hover:scale-105 cursor-pointe'>
        <div className="flex items-start space-x-6 relative">
          <Banner></Banner>
          <div className="w-[40%] px-8">
            <UpNext />
          </div>
        </div>
      </a>

      <div className='mt-20'>
        <a className='text-xl font-bold text-white '>  Top diễn viên nối tiếng</a>
        <Slider></Slider>
      </div>
      <div className='text-white mt-20'>
      <a className='text-xl font-bold text-white '>  Top diễn viên nối tiếng</a>
        <MovieSlider movies={moviesData} />
      </div>
      <div className='text-white mt-20'>
      <a className='text-xl font-bold text-white '>  Top diễn viên nối tiếng</a>
        <MovieSlider movies={moviesData} />
      </div>
      <div className='text-white mt-20'>
      <a className='text-xl font-bold text-white '>  Top diễn viên nối tiếng</a>
        <MovieSlider movies={moviesData} />
      </div>

    </div>
  );
};

export default MainPage;