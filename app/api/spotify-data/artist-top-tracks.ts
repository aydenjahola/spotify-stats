import { fetchSpotifyData } from "./helpers";

export async function getArtistTopTracks(
  artistId: string,
  accessToken: string
) {
  const tracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
  const tracksData = await fetchSpotifyData(tracksUrl, accessToken);
  return tracksData.tracks;
}
