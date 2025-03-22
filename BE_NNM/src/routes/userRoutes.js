const express = require("express");
const { register, login, getUsers, addUser, updateUser, deleteUser, getUsersCount } = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.get("/", getUsers);
router.get("/count", getUsersCount); // Thêm endpoint đếm số người dùng
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;