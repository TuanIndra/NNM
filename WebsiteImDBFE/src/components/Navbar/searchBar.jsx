import React from 'react'

const searchBar = () => {
    return (
        <div className="ml-10 flex items-center md:ml-6">
            
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="bg-gray-700 flex justify-start text-white px-6 py-2 w-64 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            <a href="/watchlist" className="ml-3  px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                Danh sách xem
            </a>
            <a href="/login" className="ml-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                Đăng nhập
            </a>
        </div>
    )
}

export default searchBar
