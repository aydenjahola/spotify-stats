import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getArtistData(artistId: string) {
  if (!artistId) {
    throw new Error("Missing 'artistId' parameter");
  }

  const session = await getSession();
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
  const artistData = await fetchSpotifyData(artistUrl, session.accessToken);

  return artistData;
}
