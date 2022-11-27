const fs = require('fs')
const path = require('path');

// sc -- songCollection
const { sc } = require('../models/songModel')

const song = async (req, res) => {
    var arr = [];
    await sc.find({}).sort({ ratings: -1 }).then((d) => {
        arr.push(d)
        arr.push(d.length)
    })
        .catch(() => console.log("error"))
    res.send(arr);
}

const newSong = async (req, res, next) => {
    console.log("new Song called")
    const s = req.body.song;
    const songExists = await sc.findOne({ 'song': s })
    if (songExists) {
        res.status(201).send('Song already exists')
        return
    }

    // for default pic
    var picData;
    if (req.body.pic.path) {
        picData = await fs.readFileSync(path.join(req.body.pic.path));

        // picData = await fs.readFileSync(path.join('F:\\glowing-system\\backend\\images\\' + req.file.filename))
        // fs.unlinkSync(path.join('F:\\glowing-system\\backend\\images\\' + req.file.filename))
    }
    else
        picData = fs.readFileSync(path.join('F:\\glowing-system\\backend\\images\\default.png'))

    // insert new song
    const d = new sc({
        pic: {
            data: picData,
            contentType: req.file ? req.file.mimetype : 'image/png'
        },
        artist: req.body.artist,
        song: req.body.song,
        rd: req.body.rd,
        ratings: req.body.ratings
    })

    d.save().then(() => {
        res.status(200).send("Successfully Inserted")
    }).catch(() => {
        // console.log(err)
        res.status(400).send('Validation Error')
    });
}

module.exports = { song, newSong }
