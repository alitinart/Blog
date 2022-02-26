const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const checkAPIKey = require("../../../middleware/checkAPIKey");

require("dotenv").config();

const RefreshToken = mongoose.model("RefreshToken");

router.get("/", checkAPIKey, (req, res) => {
  RefreshToken.find({}).then((refreshTokens) => {
    res.send({ error: false, data: { refreshTokens } });
  });
});

module.exports = router;
