const express = require("express");
const app = express();
var cors = require("cors");
const router = require("./routes/users.routes");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

console.log(process.env.MONGO_URL);

const db = process.env.MONGO_URL;
app.use(cookieParser());
mongoose
  .connect(db)
  .then(() => console.log("Kết nối thành công tới MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));
app.use(
  cors({
    origin: "http://localhost:5173", // Thay bằng origin của frontend bạn
    credentials: true, // Cho phép gửi credentials
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", router);

app.listen(4000);
