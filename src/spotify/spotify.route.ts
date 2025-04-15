import express from 'express';
import { Router } from 'express';
import { getSpotifyToken, genres } from './spotify.controller';

const router = Router();

router.get('/spotify/genres', genres);

export default router;