let mongoose = require("mongoose");

let roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  },
);

module.exports = mongoose.model("role", roleSchema);
