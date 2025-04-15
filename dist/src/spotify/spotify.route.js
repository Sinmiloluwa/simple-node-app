"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spotify_controller_1 = require("./spotify.controller");
const router = (0, express_1.Router)();
router.get('/spotify/genres', spotify_controller_1.genres);
exports.default = router;
