const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const RefreshToken = mongoose.model("RefreshToken");

require("dotenv").config();

const generateAccessToken = require("../../../functions/generateAccessToken");
const checkAPIKey = require("../../../middleware/checkAPIKey");

/**
 *
 * Register
 * Method: POST
 *
 */

router.post("/register", checkAPIKey, (req, res) => {
  const { username, email, fullName, password } = req.body;
  User.find({ username: username }).then((users) => {
    if (users.length > 0) {
      return res.json({
        error: true,
        message: "A user with that username is already registered.",
      });
    }
    User.find({ email: email }).then(async (usersEmail) => {
      if (usersEmail.length > 0) {
        return res.json({
          error: true,
          message: "A user with that email is already registered.",
        });
      }
      // Add our code
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        let newUser = new User({
          username: username,
          email: email,
          password: hashedPassword,
          fullName: fullName,
          profileImage: "No Image",
        });
        newUser.save().then((userData) => {
          res.json({ error: false, message: "User Successfully Generated" });
        });
      } catch (err) {
        res.json({ error: true, message: err });
      }
    });
  });
});

/**
 *
 * Login
 * Method: POST
 *
 */

router.post("/login", checkAPIKey, (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then(async (user) => {
    if (!user) {
      return res.json({
        error: true,
        message: "No User found with that username",
      });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = generateAccessToken(JSON.stringify(user));
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        const newRefreshToken = new RefreshToken({
          token: refreshToken,
        });

        newRefreshToken.save();
        res.json({
          error: false,
          data: {
            accessToken: accessToken,
            refreshTokenId: newRefreshToken._id,
          },
        });
      } else {
        res.json({ error: true, message: "Password incorrect" });
      }
    } catch (err) {
      res.json({ error: true, message: err });
    }
  });
});

module.exports = router;
