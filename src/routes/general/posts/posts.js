const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const checkAPIKey = require("../../../middleware/checkAPIKey");
const authenticateToken = require("../../../middleware/authenticateToken");
const adminCheck = require("../../../middleware/adminCheck");

require("dotenv").config();

const Post = mongoose.model("Post");
const User = mongoose.model("User");

// Create new post
router.post("/", checkAPIKey, adminCheck, (req, res) => {
  const { title, description, timestamp, attachments } = req.body;

  if (!title || !description || !timestamp || !attachments) {
    return res.json({ error: true, message: "Please fill all fields" });
  }

  const newPost = new Post({
    title: title,
    description: description,
    timestamp: timestamp,
    attachments: attachments,
  });

  newPost.save().then((post) => {
    res.json({ error: false, message: "Created Post Successfully" });
  });
});

// Get All Posts
router.get("/", checkAPIKey, (req, res) => {
  Post.find({}).then((posts) => {
    res.json({ error: false, data: posts });
  });
});

module.exports = router;
