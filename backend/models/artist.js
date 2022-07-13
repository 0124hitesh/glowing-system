const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    artist: { type: String },
    songs: { type: Array, default: [] }
})

const ac = new mongoose.model("artists", artistSchema)
module.exports = {ac}