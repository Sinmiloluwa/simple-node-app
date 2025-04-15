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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewReleases = exports.getGenres = exports.getSpotifyAccessToken = void 0;
const https_1 = __importDefault(require("https"));
const querystring_1 = __importDefault(require("querystring"));
const getSpotifyAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const postData = querystring_1.default.stringify({
        grant_type: 'client_credentials',
        scope: 'user-read-private user-read-email',
    });
    const authString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64Auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.write(postData);
        req.end();
    });
});
exports.getSpotifyAccessToken = getSpotifyAccessToken;
const getGenres = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: 'api.spotify.com',
        path: '/v1/browse/categories?locale=en_US',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
});
exports.getGenres = getGenres;
const getNewReleases = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: 'api.spotify.com',
        path: '/v1/browse/new-releases',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
});
exports.getNewReleases = getNewReleases;
