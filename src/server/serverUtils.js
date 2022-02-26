const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", require("../routes/index"));
app.use("/general/users", require("../routes/general/users/users"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("App listening on port 8000"));
