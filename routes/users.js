var express = require("express");
var router = express.Router();
let userModel = require("../schemas/users");

// 1.1) Lấy tất cả (chỉ lấy người chưa bị xoá mềm)
router.get("/", async (req, res) => {
  let users = await userModel.find({ isDeleted: false }).populate("role");
  res.send(users);
});

// 1.2) Lấy theo ID
router.get("/:id", async (req, res) => {
  try {
    let user = await userModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    res.send(user);
  } catch (err) {
    res.status(404).send({ message: "Không tìm thấy" });
  }
});

// 1.3) Tạo mới (C)
router.post("/", async (req, res) => {
  try {
    let newUser = new userModel(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 1.4) Xoá mềm (UD) - Chuyển isDeleted thành true
router.delete("/:id", async (req, res) => {
  await userModel.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.send({ message: "Xoá mềm thành công" });
});

// 2) API Enable
router.post("/enable", async (req, res) => {
  const { email, username } = req.body;
  let user = await userModel.findOneAndUpdate(
    { email, username, isDeleted: false },
    { status: true },
    { new: true },
  );
  if (user) res.send({ message: "Đã kích hoạt", user });
  else res.status(400).send({ message: "Thông tin không chính xác" });
});

// 3) API Disable
router.post("/disable", async (req, res) => {
  const { email, username } = req.body;
  let user = await userModel.findOneAndUpdate(
    { email, username, isDeleted: false },
    { status: false },
    { new: true },
  );
  if (user) res.send({ message: "Đã vô hiệu hoá", user });
  else res.status(400).send({ message: "Thông tin không chính xác" });
});

module.exports = router;
