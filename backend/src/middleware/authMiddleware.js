const Jwt = require("jsonwebtoken");

const AuthArtist = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have permission to create Music",
      });
    }

    req.user = decoded; // ⭐ IMPORTANT LINE
    next();

  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = AuthArtist;