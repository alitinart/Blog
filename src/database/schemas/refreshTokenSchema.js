const mongoose = require("mongoose");

const RefreshToken = new mongoose.Schema({
  token: { type: String },
});

mongoose.model("RefreshToken", RefreshToken);
