import React from 'react'
import Navbar from '../Navbar/Navbar'
import MainPage from './mainPage'


const homePage = () => {
  return (
    <div className='bg-black'>
      <Navbar></Navbar>
      <MainPage></MainPage>
    </div>
  )
}

export default homePage
