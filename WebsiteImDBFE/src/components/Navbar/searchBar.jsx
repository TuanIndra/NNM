import React from 'react'

const searchBar = () => {
    return (
        <div className="ml-10 flex items-center md:ml-6">
            
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="bg-gray-700 flex justify-start text-white px-6 py-2 w-64 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            <a href="#" className="ml-3  px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                WatchList
            </a>
            <a href="#" className="ml-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                Sign In
            </a>
        </div>
    )
}

export default searchBar
