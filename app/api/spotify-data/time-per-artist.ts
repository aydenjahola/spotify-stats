/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function getTimePerArtist(timeRange: string = "short_term") {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/player/recently-played?time_range=${timeRange}&limit=50`;
  const data = await fetchSpotifyData(url, session.accessToken);

  const artistTime: { [key: string]: { id: string; time: number } } = {};

  data.items.forEach((item: any) => {
    const artist = item.track.artists[0];
    const artistName = artist.name;
    const artistId = artist.id;
    const duration = item.track.duration_ms / 60000; // Convert ms to minutes

    if (artistTime[artistName]) {
      artistTime[artistName].time += duration;
    } else {
      artistTime[artistName] = {
        id: artistId,
        time: duration,
      };
    }
  });

  return artistTime;
}
