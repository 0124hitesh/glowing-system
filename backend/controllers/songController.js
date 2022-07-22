const fs = require('fs')
const path = require('path')

// sc -- songCollection
const {sc}= require('../models/songModel')

const song = async (req, res) => {
    var arr = [];
    await sc.find({}).sort({ratings: -1}).then((d) => {
        arr.push(d)
        arr.push(d.length)
    })
    .catch(() => console.log("error"))
    res.send(arr);
}

const newSong = async (req, res) => {
    if (req.body.artist === '' || req.body.song === '' || req.body.rd === '' || req.body.ratings === '') {
        res.send("Failed")
        return;
    }
    const d = new sc({
        pic: {
            data: fs.readFileSync(path.join('F:\\glowing-system\\backend\\images\\' + req.file.filename)),
            contentType: req.file.mimetype 
        },
        artist: req.body.artist,
        song: req.body.song,
        rd: req.body.rd,
        ratings: req.body.ratings
    })
    // console.log(d)
    await d.save();
    fs.unlinkSync(path.join('F:\\glowing-system\\backend\\images\\' + req.file.filename))
    res.send("Inserted")
}

module.exports = {song, newSong}