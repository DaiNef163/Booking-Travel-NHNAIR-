const express = require("express");
const router = express.Router();
const DesStorage = require("../services/DesStorage");
const {
  register,
  login,
  profile,
  logout,
  uploadByLink,
  uploadFromDevice,
} = require("../controllers/User.controller");
const multer = require("multer");
// const photosMiddleware = multer({ dest: "../public/uploads/" });
const photosMiddleware = multer({ storage: DesStorage });

router.get("/test", (req, res, next) => {
  res.json("abc");
});
router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/upload-by-link", uploadByLink);
router.post(
  "/upload-by-device",
  photosMiddleware.array("photos", 100),
  uploadFromDevice
);

module.exports = router;
