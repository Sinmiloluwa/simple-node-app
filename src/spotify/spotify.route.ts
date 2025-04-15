import express from 'express';
import { Router } from 'express';
import { getSpotifyToken, genres, newReleases } from './spotify.controller';

const router = express.Router();

router.get('/genres', genres);
router.get('/new-releases', newReleases);

export default router;