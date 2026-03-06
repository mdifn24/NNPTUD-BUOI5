var express = require("express");
var router = express.Router();
let roleModel = require("../schemas/roles");

// 1. GET ALL Roles
router.get("/", async (req, res) => {
  try {
    let roles = await roleModel.find();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 2. GET Role theo ID
router.get("/:id", async (req, res) => {
  try {
    let role = await roleModel.findById(req.params.id);
    if (!role) return res.status(404).send({ message: "Không tìm thấy Role" });
    res.status(200).send(role);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 3. POST - Tạo mới Role
router.post("/", async (req, res) => {
  try {
    let newRole = new roleModel(req.body);
    await newRole.save();
    res.status(201).send(newRole);
  } catch (error) {
    res.status(400).send({ message: "Lỗi tạo Role (có thể trùng tên)", error });
  }
});

// 4. DELETE - Xoá (Trong yêu cầu Role không nhắc xóa mềm, nhưng bạn có thể làm tương tự User nếu muốn)
router.delete("/:id", async (req, res) => {
  try {
    await roleModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Xoá Role thành công" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
