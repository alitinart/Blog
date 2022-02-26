const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String, required: "This field is required" },
  fullName: { type: String, required: "This field is required" },
  password: { type: String, required: "This field is required" },
  email: { type: String, required: "This field is required" },
  profileImage: { type: String, required: "This field is required" },
});

mongoose.model("User", User);
