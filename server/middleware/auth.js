const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    res.status(401).json({ error: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
