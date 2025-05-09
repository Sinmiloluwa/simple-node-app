import { release } from "os";
import { getSpotifyAccessToken, getGenres, getNewReleases, incubatorList } from "./spotify.service";
import { Request, Response } from "express";

let cachedToken: { token: string; expiresAt: number } | null = null as { token: string; expiresAt: number } | null;

export const getSpotifyToken = async () => {
    const now = Date.now();

    if (cachedToken && now < cachedToken.expiresAt) {
        return cachedToken.token;
    }

    try {
        const tokenResponse = await getSpotifyAccessToken() as { expires_in: number; access_token: string };


        const expiresIn = tokenResponse.expires_in * 1000;

        cachedToken = {
            token: tokenResponse.access_token,
            expiresAt: now + expiresIn - 60_000, 
        };

        return cachedToken.token;
    } catch (error) { 
        console.log(error);  
    }
}

export const genres = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = await getSpotifyToken();
        const response = await getGenres(token) as any;
        const data = response.categories.items;
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "No genres found",
            });
        }
        const formattedData = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.icons?.[0]?.url || null,
        }));

        return res.status(200).json({
            status: true,
            data: formattedData,
        });
    } catch (error) {
        console.error("Error fetching albums:", error);
        throw new Error("Failed to fetch albums");
    }
}

export const newReleases = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = await getSpotifyToken();
        const response = await getNewReleases(token) as any;
        const data = response.albums.items;
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "No new releases found",
            });
        }

        const formattedData = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.images?.[0]?.url || null,
            releaseDate: item.release_date,
        }))
        .filter((item: any) => {
            const date = new Date(item.releaseDate); 
            return date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 
        });
        

        return res.status(200).json({
            status: true,
            data: formattedData,
        });
    } catch (error) {
        console.error("Error fetching albums:", error);
        throw new Error("Failed to fetch albums");
    }
}

export const incubatorPlaylist = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = await getSpotifyToken();
        const response = await incubatorList(token) as any;
        const followers = response.followers.total;
        const link = response.href;
        const image = response.images?.[0]?.url || null;
        const name = response.name;
        const tracks = response.tracks.items.map((item: any) => ({
            id: item.track.id,
            name: item.track.name,
            image: item.track.album.images?.[0]?.url || null,
            artists: item.track.artists.map((artist: any) => ({
                id: artist.id,
                name: artist.name,
                image: artist.images?.[0]?.url || null,
            }))
        }));

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
    } catch (error) {
        console.error("Error fetching playlists:", error);
        throw new Error("Failed to fetch albums");
    }
}