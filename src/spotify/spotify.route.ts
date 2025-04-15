import express from 'express';
import { Router } from 'express';
import { getSpotifyToken, genres, newReleases, incubatorPlaylist } from './spotify.controller';

const router = express.Router();

router.get('/genres', genres);
router.get('/new-releases', newReleases);
router.get('/incubator-playlist', incubatorPlaylist);

export default router;