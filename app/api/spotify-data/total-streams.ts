// spotify-data/total-streams.ts

import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTotalStreams() {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/player/recently-played?limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);

  const totalStreams = data.items.length;

  return { totalStreams };
}
