const mongoose = require('mongoose')
const multer = require("multer");

const songSchema = new mongoose.Schema({
    pic: {
        data: Buffer, 
        contentType: String
     },
    artist: { type: String },
    song: String,
    rd: { type: Date, default: Date.now },
    ratings: Number
});

const imgstorage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './images');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
  
const upload = multer({ storage : imgstorage});  

const sc = new mongoose.model("songs", songSchema);
module.exports = {sc, upload}