var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mongoose = require("mongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * KẾT NỐI MONGODB ATLAS
 * Mình đã thêm tên database 'NNPTUD-C6' vào sau dấu '/' và trước dấu '?'
 * để dữ liệu không bị bay vào database 'test' mặc định.
 */
const mongoURI =
  "mongodb+srv://tranhuutri:sK1ygzW6IudCpKkh@cluster0.m7pbuzf.mongodb.net/NNPTUD-C6?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI);

mongoose.connection.on("connected", function () {
  console.log("✅ Đã kết nối thành công với MongoDB Atlas!");
});

mongoose.connection.on("error", function (err) {
  console.log("❌ Lỗi kết nối: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("⚠️ Đã ngắt kết nối với MongoDB.");
});

// Cấu hình các route
app.use("/", require("./routes/index"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/products", require("./routes/products"));
app.use("/api/v1/categories", require("./routes/categories"));

// Thêm route cho Roles (để thực hiện CRUD Role đã nói ở bước trước)
app.use("/api/v1/roles", require("./routes/roles"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
