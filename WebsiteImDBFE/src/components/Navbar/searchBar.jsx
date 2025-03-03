import React from 'react'

const searchBar = () => {
    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="bg-gray-700 flex justify-start text-white px-6 py-2 w-140 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
           
        </div>
    )
}

export default searchBar
