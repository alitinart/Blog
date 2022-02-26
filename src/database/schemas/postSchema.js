const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  title: { type: String, required: "This field is required" },
  description: { type: String, required: "This field is required" },
  timestamp: { type: String, required: "This field is required" },
  attachments: { type: Array, required: "This field is required" },
});

mongoose.model("Post", Post);
