const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAPIKey = require("../middleware/checkAPIKey");

router.get("/", checkAPIKey, (req, res) => {
  res.send("Connected To Blog API");
});

module.exports = router;
