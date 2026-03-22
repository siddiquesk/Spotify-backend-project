const express = require("express");
const router = express.Router();

const musicController = require("../controller/musicController");
const AuthArtist = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  AuthArtist,
  upload.single("music"),
  musicController.createMusic
);

router.post(
  "/album",
  AuthArtist,
  musicController.albumMusic
);

module.exports = router;