import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTopTracks(timeRange: string = "short_term") {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);
  return data;
}
