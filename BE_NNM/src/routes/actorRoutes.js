const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");

router.get('/top', actorController.getTopActors);
router.get("/", actorController.getAllActors); // Lấy tất cả diễn viên
router.get("/:id", actorController.getActorById); // Lấy 1 diễn viên theo ID
router.post("/", actorController.createActor); // Thêm diễn viên
router.put("/:id", actorController.updateActor); // Cập nhật diễn viên
router.delete("/:id", actorController.deleteActor); // Xóa diễn viên


module.exports = router;
