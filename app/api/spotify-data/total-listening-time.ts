/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTotalListeningTime() {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/player/recently-played?limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);

  // Calculate total time listened (in minutes)
  const totalTime = data.items.reduce(
    (acc: number, item: any) => acc + item.track.duration_ms,
    0
  );
  const totalMinutes = totalTime / 60000; // Convert ms to minutes

  return { totalListeningTime: totalMinutes };
}
