const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role: role || "user" });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Trả về userId
    res.status(200).json({ 
      token, 
      user: { 
        _id: user._id,  // ✅ Thêm user._id vào response
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error("❌ Lỗi khi login:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
};

const getUsers = async (req, res) => {
  try {
      const users = await User.find({ role: { $ne: "admin" } }); // 🔥 Ẩn tài khoản admin
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
  }
};

// 📌 Thêm người dùng mới
const addUser = async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Kiểm tra email đã tồn tại chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role: "user", // 🛑 Chỉ cho phép tạo user (không cho tạo admin)
      });

      await newUser.save();
      res.status(201).json({ message: "Người dùng đã được tạo!" });
  } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm người dùng" });
  }
};

// 📌 Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

      user.name = name || user.name;
      user.email = email || user.email;

      // Nếu có mật khẩu mới, mã hóa lại
      if (password) {
          user.password = await bcrypt.hash(password, 10);
      }

      await user.save();
      res.json({ message: "Cập nhật thành công!" });
  } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng" });
  }
};

// 📌 Xóa người dùng
const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      await User.findByIdAndDelete(id);
      res.json({ message: "Người dùng đã bị xóa!" });
  } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa người dùng" });
  }
};
module.exports = { register, login, getUsers, addUser, updateUser, deleteUser};
