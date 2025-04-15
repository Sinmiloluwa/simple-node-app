import https from 'https';
import querystring from 'querystring';

export const getSpotifyAccessToken = async () => {
    const postData = querystring.stringify({
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
        const req = https.request(options, (res) => {
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
}

export const getGenres = async (token: string | undefined) => {

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
        const req = https.request(options, (res) => {
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
}