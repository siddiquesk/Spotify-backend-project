const express = require("express");
const router = express.Router();

const musicController = require("../controller/musicController");
const AuthMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  AuthMiddleware.AuthArtist,
  upload.single("music"),
  musicController.createMusic
);

router.post(
  "/album",
  AuthMiddleware.AuthArtist,
  musicController.albumMusic
);

router.get(
  "/",
  AuthMiddleware.AuthUser,
  musicController.getAllMusic,
);

router.get(
  "/album",
  AuthMiddleware.AuthUser,
  musicController.getAllAlbum,
);

router.get(
  "/album/:id",
  AuthMiddleware.AuthUser,
  musicController.getAlbumMusic,
);

module.exports = router;