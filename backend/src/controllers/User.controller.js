const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtSecret = "hjdsabdsajkdhjasdhjksa123";
const imageDownloader = require("image-downloader");
const path = require("path");
const multer = require("multer");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userRegister = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userRegister);
  } catch (error) {
    res.status(422).json(error);
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userLogin = await User.findOne({ email });
//     console.log(userLogin);
//     if (userLogin) {
//       const passwordTrue = bcrypt.compareSync(password, userLogin.password);
//       if (passwordTrue) {
//         jwt.sign(
//           { email: userLogin.email, id: userLogin._id },
//           jwtSecret,
//           { expiresIn: "1h" },
//           (err, token) => {
//             if (err) throw err;
//             res
//               .cookie("token", token)
//               .status(200)
//               .json({ user: userLogin, token });
//           }
//         );
//       } else {
//         res.status(422).json("pass false");
//       }
//     } else {
//       res.json("not found");
//     }
//   } catch (error) {}
// };
const login = async (req, res) => {
  // const { email, password } = req.body;
  // try {
  //   const userLogin = await User.findOne({ email });
  //   console.log("User found:", userLogin);

  //   if (userLogin) {
  //     const passwordTrue = bcrypt.compareSync(password, userLogin.password);
  //     console.log("Password comparison result:", passwordTrue);

  //     if (passwordTrue) {
  //       jwt.sign(
  //         { email: userLogin.email, id: userLogin._id },
  //         jwtSecret,
  //         { expiresIn: "1h" },
  //         (err, token) => {
  //           if (err) {
  //             console.error("JWT signing error:", err);
  //             return res.status(500).json({ error: "Internal server error" });
  //           }
  //           res
  //             .cookie("token", token, {
  //               httpOnly: true,
  //               secure: true,
  //               sameSite: "Strict",
  //             })
  //             .status(200)
  //             .json({ user: userLogin, token });
  //         }
  //       );
  //     } else {
  //       res.status(401).json({ error: "Password is incorrect" }); // 401 Unauthorized
  //     }
  //   } else {
  //     res.status(404).json({ error: "User not found" }); // 404 Not Found
  //   }
  // } catch (error) {
  //   console.error("Login error:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
};

const profile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

console.log({ __dirname });
console.log(process.cwd());
const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  const uploadsDir = path.join(__dirname, "..", "uploads");
  const uploadPath = path.join(uploadsDir, newName);
  await imageDownloader.image({
    url: link,
    dest: uploadPath,
  });
  res.json(newName);
};

// const photosMiddleware = multer({ dest: "uploads" });
const upload = async (req, res) => {
  try {
    const files = req.files;
    console.log(files);
    res.json(req.photos);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { register, login, profile, logout, uploadByLink, upload };
