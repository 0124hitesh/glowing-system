const mongoose = require("mongoose");
const express = require('express');
const formData = require("express-form-data");
const multer = require("multer");
const fs = require('fs')
const path = require('path');


mongoose.connect('mongodb://127.0.0.1:27017/y_DB', { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => console.log("Connectedd")).catch((e) => { console.log(e) });

const app = express();

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log("Server Connected " + port) })

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }))

// for parsing application/json
app.use(express.json())

// for parsing multipart/form-data
// app.use(formData.parse())
// app.use(formData.union())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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

const artistSchema = new mongoose.Schema({
    artist: { type: String },
    songs: { type: Array, default: [] }
})

// sc -- songCollection
const sc = new mongoose.model("songs", songSchema);

// ac -- artistCollection
const ac = new mongoose.model("artists", artistSchema)

app.get('/songs', async (req, res) => {
    var arr = [];
    await sc.find({}).then((d) => {
        arr.push(d)
        // console.log(d.pic)
    })
    .catch(() => console.log("error"))

    res.send(arr);
})

app.post('/newSong', upload.single("pic"), async (req, res) => {
    if (req.body.artist === '' || req.body.song === '' || req.body.rd === '' || req.body.ratings === '') {
        res.send("Failed")
        return;
    }
    console.log(req.body.pic)
    const d = new sc({
        pic: {
            data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
            contentType: req.file.mimetype 
        },
        artist: req.body.artist,
        song: req.body.song,
        rd: req.body.rd,
        ratings: req.body.ratings
    })
    // console.log(d)
    await d.save();
    fs.unlinkSync( path.join(__dirname + '/images/' + req.file.filename))
    res.send("Inserted")
})

app.put('/newArtist', (req, res) => {
    const art = req.body.artist;
    if (art === '') {
        res.status(400).send(result.error.message);
        return;
    }
    ac.find({ artist: art }, (err, d) => {
        if (err) {
            res.status(400).send(err)
        }
        else {
            if (d.length === 0) {
                ac.create({ artist: art, songs: [req.body.song] });
                res.send("Inserted")
            }
            else {
                d.map(async (x) => {
                    await x.songs.push(req.body.song)
                    console.log(x)
                    ac.updateOne({ artist: art }, { $set: { songs: x.songs } }).then(() => {})
                    res.send("Updated")
                })
            }
        }
    })
    return;
})