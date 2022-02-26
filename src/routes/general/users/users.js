const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const RefreshToken = mongoose.model("RefreshToken");

require("dotenv").config();

const checkAPIKey = require("../../../middleware/checkAPIKey");
const adminCheck = require("../../../middleware/adminCheck");

/**
 *
 * Return all users
 * Method: GET
 *
 */

router.get("/", checkAPIKey, (req, res) => {
  User.find({}).then((users) => {
    res.json({ error: false, data: { users } });
  });
});

/**
 *
 * Delete User
 * Method: DELETE
 *
 */

router.delete("/", checkAPIKey, adminCheck, (req, res) => {
  const { refreshTokenId, userId } = req.body;
  if (!refreshTokenId) {
    return res.json({ error: true, message: "Refresh Token ID not provided" });
  }
  RefreshToken.findOneAndDelete({ _id: refreshTokenId })
    .then((deletedToken) => {
      User.findOneAndDelete({ _id: req.body.userId })
        .then((user) => {
          res.json({ error: false, message: "Deleted User Successfully" });
        })
        .catch((err) => {
          res.send({ error: true, message: err.message });
        });
    })
    .catch((err) => {
      res.send({ error: true, message: err.message });
    });
});

module.exports = router;
