import { getSpotifyAccessToken, getGenres } from "./spotify.service";
import { Request, Response } from "express";

let cachedToken: { token: string; expiresAt: number } | null = null as { token: string; expiresAt: number } | null;

export const getSpotifyToken = async () => {
    const now = Date.now();

    if (cachedToken && now < cachedToken.expiresAt) {
        return cachedToken.token;
    }

    try {
        const tokenResponse = await getSpotifyAccessToken() as { expires_in: number; access_token: string };
        console.log("Token Response:", tokenResponse);


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