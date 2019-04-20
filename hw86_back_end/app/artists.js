const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Artist = require('../models/Artist');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', (req, res) => {
    console.log('req query id ', req.query.id);
    if (req.query.id) {
        Artist.findOne({_id: req.query.id}).then(artist => {
            if (artist) res.send(artist);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    } else {
        Artist.find()
        .then(artists => res.send(artists))
        .catch(() => res.sendStatus(500));
    }
});


router.post('/', upload.single('image'), (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);

    artist.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;