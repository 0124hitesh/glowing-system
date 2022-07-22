// ac -- artistCollection
const {ac} = require('../models/artist')

const newArtist = (req, res) => {
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
                    // console.log(x)
                    ac.updateOne({ artist: art }, { $set: { songs: x.songs } }).then(() => {})
                    res.send("Updated")
                })
            }
        }
    })
    return;
}