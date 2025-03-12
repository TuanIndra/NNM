import { useState } from "react";
import Navbar from '../Navbar/Navbar'
import { toast } from "react-toastify";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại.");
      }
  
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
  
      toast.success("Đăng nhập thành công!", { position: "top-center" });

  
      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/home"; 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex justify-center mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb Logo" className="w-16" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-yellow-300" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-yellow-300" required />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Bạn chưa có tài khoản?{" "}
            <a href="/register" className="text-yellow-500 hover:underline">Đăng ký</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
