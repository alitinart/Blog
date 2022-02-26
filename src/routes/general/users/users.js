const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const RefreshToken = mongoose.model("RefreshToken");

require("dotenv").config();

const checkAPIKey = require("../../../middleware/checkAPIKey");

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

module.exports = router;
