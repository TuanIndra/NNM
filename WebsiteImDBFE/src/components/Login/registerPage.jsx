import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
            alt="IMDb Logo"
            className="w-16"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              type="text"
              name="Họ tên"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="Họ tên"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="Tối thiểu 6 ký tự"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Mật khẩu có ít nhất 6 ký tự</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
            <input
              type="password"
              name="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Tạo tài khoản IMDb
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Bạn đã có tài khoản? <a href="/login" className="text-blue-500">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
}
