/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getAlbumTracks(albumId: string, accessToken: string) {
  const session = await getSession();

  if (!accessToken && !session?.accessToken) {
    throw new Error("User session is invalid or unauthorized.");
  }

  if (!albumId) {
    throw new Error("Album ID is required to get album tracks.");
  }

  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks?&limit=50`;

  try {
    const data = await fetchSpotifyData(url, accessToken);

    const tracksWithImages = data.items.map((track: any) => ({
      ...track,
      imageUrl: "",
    }));

    return { ...data, items: tracksWithImages };
  } catch (error) {
    const e = error as Error;
    console.error(`Error in getAlbumTracks: ${e.message}`);
    throw new Error("An error occurred while getting album tracks.");
  }
}
