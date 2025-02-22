import React, { useState } from 'react';

const CreateWatchlist = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Xử lý logic tạo watchlist ở đây (có thể gọi API để lưu vào database)
    alert(`Watchlist "${name}" đã được tạo!`);
    setName('');
    setDescription('');
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Tạo Danh Sách Xem Mới</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block text-sm font-medium mb-2">Tên danh sách</label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:ring-2 focus:ring-yellow-500"
          placeholder="Nhập tên danh sách..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2">Mô tả</label>
        <textarea
          className="w-full p-2 bg-gray-700 text-white rounded focus:ring-2 focus:ring-yellow-500"
          placeholder="Mô tả danh sách của bạn..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600 transition"
          onClick={handleCreate}
        >
          Tạo danh sách
        </button>
      </div>
    </div>
  );
};

export default CreateWatchlist;
