const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/signup", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (foundUser) {
      res.status(500).json({ errorMessage: "Please pick a unique email" });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (foundUser) {
      const passwordMatch = bcryptjs.compareSync(
        req.body.password,
        foundUser.password
      );
      if (passwordMatch) {
        const loggedInUser = {
          _id: foundUser._id,
          user: foundUser.name,
        };
        const authToken = jwt.sign(loggedInUser, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ message: "Login successful", authToken });
      } else {
        res.status(500).json({ errorMessage: "Invalid password" });
      }
    } else {
      res.status(500).json({ errorMessage: "Invalid email" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  if (req.payload) {
    console.log("req payload in status 200", req.payload)
    res.status(200).json({ message: "Valid Token", user: req.payload });
  } else {
    console.log("req payload in status 401", req.payload)

    res.status(401).json({ errorMessage: "Invalid Token" });
  }
});

module.exports = router;
