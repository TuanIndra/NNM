import React from 'react'
import Main from '../../assets/main.jpg'
const mainPage = () => {
  return (
    <div>
      <div>
        <div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='h-30 w-60 py-10 '>
                    <img src={Main} alt='Main test'></img>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default mainPage
