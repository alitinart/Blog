require("dotenv").config();

function adminCheck(req, res, next) {
  const userId = req.headers["user-id"];
  if (!userId) {
    return res.json({ error: true, message: "User ID not provided" });
  }
  if (userId !== process.env.ADMIN_ID) {
    return res.json({
      error: true,
      message: "Forbidden. You are not a admin !",
    });
  }
  next();
}

module.exports = adminCheck;
