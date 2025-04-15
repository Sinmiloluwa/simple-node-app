"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incubatorPlaylist = exports.newReleases = exports.genres = exports.getSpotifyToken = void 0;
const spotify_service_1 = require("./spotify.service");
let cachedToken = null;
const getSpotifyToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = Date.now();
    if (cachedToken && now < cachedToken.expiresAt) {
        return cachedToken.token;
    }
    try {
        const tokenResponse = yield (0, spotify_service_1.getSpotifyAccessToken)();
        const expiresIn = tokenResponse.expires_in * 1000;
        cachedToken = {
            token: tokenResponse.access_token,
            expiresAt: now + expiresIn - 60000,
        };
        return cachedToken.token;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSpotifyToken = getSpotifyToken;
const genres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, exports.getSpotifyToken)();
        const response = yield (0, spotify_service_1.getGenres)(token);
        const data = response.categories.items;
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "No genres found",
            });
        }
        const formattedData = data.map((item) => {
            var _a, _b;
            return ({
                id: item.id,
                name: item.name,
                image: ((_b = (_a = item.icons) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || null,
            });
        });
        return res.status(200).json({
            status: true,
            data: formattedData,
        });
    }
    catch (error) {
        console.error("Error fetching albums:", error);
        throw new Error("Failed to fetch albums");
    }
});
exports.genres = genres;
const newReleases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, exports.getSpotifyToken)();
        const response = yield (0, spotify_service_1.getNewReleases)(token);
        const data = response.albums.items;
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "No new releases found",
            });
        }
        const formattedData = data.map((item) => {
            var _a, _b;
            return ({
                id: item.id,
                name: item.name,
                image: ((_b = (_a = item.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || null,
                releaseDate: item.release_date,
            });
        })
            .filter((item) => {
            const date = new Date(item.releaseDate);
            return date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        });
        return res.status(200).json({
            status: true,
            data: formattedData,
        });
    }
    catch (error) {
        console.error("Error fetching albums:", error);
        throw new Error("Failed to fetch albums");
    }
});
exports.newReleases = newReleases;
const incubatorPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = yield (0, exports.getSpotifyToken)();
        const response = yield (0, spotify_service_1.incubatorList)(token);
        const followers = response.followers.total;
        const link = response.href;
        const image = ((_b = (_a = response.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || null;
        const name = response.name;
        const tracks = response.tracks.items.map((item) => {
            var _a, _b;
            return ({
                id: item.track.id,
                name: item.track.name,
                image: ((_b = (_a = item.track.album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || null,
                artists: item.track.artists.map((artist) => {
                    var _a, _b;
                    return ({
                        id: artist.id,
                        name: artist.name,
                        image: ((_b = (_a = artist.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || null,
                    });
                })
            });
        });
        return res.status(200).json({
            status: true,
            data: {
                followers,
                link,
                image,
                name,
                tracks
            }
        });
    }
    catch (error) {
        console.error("Error fetching playlists:", error);
        throw new Error("Failed to fetch albums");
    }
});
exports.incubatorPlaylist = incubatorPlaylist;
