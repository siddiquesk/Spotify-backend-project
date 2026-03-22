const Music = require("../model/musicModel");
const Album = require("../model/albumModel");
const uploadFile = require("../services/storageImagekit");

// 🎵 CREATE MUSIC
const createMusic = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Music file required" });
    }

    const result = await uploadFile(
      file.buffer.toString("base64")
    );

    const music = await Music.create({
      title,
      uri: result.url,
      artist: req.user.id, // ✅ decoded ki jagah
    });

    res.status(201).json({
      message: "Music Created Successfully",
      music,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 💿 CREATE ALBUM
const albumMusic = async (req, res) => {
  try {
    const { title, musics } = req.body;

    const album = await Album.create({
      title,
      artist: req.user.id, // ✅
      musics,
    });

    res.status(201).json({
      message: "Album Created Successfully",
      album,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createMusic,
  albumMusic,
};