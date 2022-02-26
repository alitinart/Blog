const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOCONNECT, (err) => {
  if (!err) {
    console.log("Successfully connected to MongoDB :)");
  } else {
    console.log("Error in connection " + err);
  }
});

require("../database/schemas/userSchema");
require("../database/schemas/refreshTokenSchema");
require("../database/schemas/postSchema");
