const express = require('express');
const { song, newSong } = require('../controllers/songController');
const { upload } = require('../models/songModel');

const songRoutes =express.Router();

songRoutes.route('/songs').get(song)
songRoutes.route('/newSong').post(upload.single("pic"), newSong)

module.exports = {songRoutes}