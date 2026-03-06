let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, default: "" },
    avatarUrl: { type: String, default: "https://i.sstatic.net/l60Hf.png" },
    status: { type: Boolean, default: false },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "role", // Liên kết đến model role
      required: true,
    },
    loginCount: { type: Number, default: 0, min: 0 },
    isDeleted: { type: Boolean, default: false }, // Phục vụ cho Xoá mềm
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
