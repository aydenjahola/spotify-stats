import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getRecentTracks() {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/player/recently-played?limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);
  return data;
}
