/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTotalListeningTime(timeRange: string = "short_term") {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);

  const totalTime = data.items.reduce(
    (acc: number, item: any) => acc + item.duration_ms,
    0
  );
  const totalMinutes = totalTime / 60000; // Convert ms to minutes

  return { totalListeningTime: totalMinutes };
}
