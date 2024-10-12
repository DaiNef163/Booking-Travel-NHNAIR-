const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  logout,
  uploadByLink,
  upload,
} = require("../controllers/User.controller");
const multer = require("multer");
const photosMiddleware = multer({ dest: "uploads" });

router.get("/test", (req, res, next) => {
  res.json("abc");
});
router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", photosMiddleware.array("photos", 100), upload);

module.exports = router;
