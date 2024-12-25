import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getAlbum(albumId: string, accessToken: string) {
  const session = await getSession();

  if (!accessToken && !session?.accessToken) {
    throw new Error("User session is invalid or unauthorized.");
  }

  if (!albumId) {
    throw new Error("Album ID is required to get album details.");
  }

  const url = `https://api.spotify.com/v1/albums/${albumId}`;
  const data = await fetchSpotifyData(url, accessToken);

  return data;
}
