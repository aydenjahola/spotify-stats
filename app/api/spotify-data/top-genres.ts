/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTopGenres(timeRange: string = "short_term") {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);

  // Extract genres from the artists' data
  const genres = data.items.flatMap((artist: any) => artist.genres);

  // Return a unique list of genres
  return [...new Set(genres)];
}
