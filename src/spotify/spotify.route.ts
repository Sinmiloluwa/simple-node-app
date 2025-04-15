import express from 'express';
import { Router } from 'express';
import { getSpotifyToken, genres } from './spotify.controller';

const router = express.Router();

router.get('/genres', genres);

export default router;