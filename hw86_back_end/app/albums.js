const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Album = require('../models/Album');
const Track = require('../models/Track');
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

router.get('/', async (req, res) => {

    if (req.query.artist) {

        Album.find().populate('artist').sort({year: 1}).then( function(albums) {
            const result = [];
            albums.map(async (item, ndx) => {
                if (item.artist._id == req.query.artist) {
                    result.push(item);

                    await Track.find({album: item._id}).then(function (track) {
                        item.tracks = track.length;
                    });

                }

            });

            if (result.length !== 0) res.send(result);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    } else {
        Album.find().populate('artist')
            .then(albums => res.send(albums))
            .catch(() => res.sendStatus(500));
    }
});

router.get('/:id', (req, res) => {

    Album.findOne({_id: req.params.id}).populate('artist').then(album => {
        if (album) res.send(album);
        else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
});


router.post('/', upload.single('image'), (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }
    const album = new Album(albumData);
    album.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;