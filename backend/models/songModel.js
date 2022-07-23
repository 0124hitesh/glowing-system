const mongoose = require('mongoose')
const multer = require("multer");

const songSchema = new mongoose.Schema({
  pic: {
    data: Buffer,
    contentType: String,
    required: false,
  },
  artist: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
    unique: true
  },
  rd: {
    type: Date,
    default: Date.now,
  },
  ratings: {
    type: Number,
    required: true,
  }
},
  {
    timestamps: true
  });

const imgstorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: imgstorage });

const sc = new mongoose.model("songs", songSchema);
module.exports = { sc, upload }