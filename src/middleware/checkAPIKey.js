require("dotenv").config();

function checkAPIKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.json({ error: true, message: "No API Key provided" });
  }
  if (apiKey !== process.env.API_KEY) {
    return res.json({ error: true, message: "Invalid API Key" });
  }
  next();
}

module.exports = checkAPIKey;
