import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTopArtists(timeRange: string = "short_term") {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`;
  const data = await fetchSpotifyData(url, session.accessToken);
  return data;
}
