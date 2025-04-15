"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotify_controller_1 = require("./spotify.controller");
const router = express_1.default.Router();
router.get('/genres', spotify_controller_1.genres);
router.get('/new-releases', spotify_controller_1.newReleases);
router.get('/incubator-playlist', spotify_controller_1.incubatorPlaylist);
exports.default = router;
