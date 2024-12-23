import { getSession } from "./auth";
import { getArtistData } from "./search";
import { getArtistAlbums } from "./artist-albums";
import { getArtistTopTracks } from "./artist-top-tracks";

import { getAllStats } from "./stats";
import { getTopArtists } from "./top-artists";
import { getTopTracks } from "./top-tracks";
import { getTopGenres } from "./top-genres";
import { getRecentTracks } from "./recent-tracks";
import { getTotalListeningTime } from "./total-listening-time";
import { getTimePerArtist } from "./time-per-artist";
import { getTotalStreams } from "./total-streams";
import { CheckIfUserFollowsArtists } from "./CheckIfUserFollowsArtists";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");
  const artistId = url.searchParams.get("artistId");
  const timeRange = url.searchParams.get("time_range") || "short_term";

  try {
    // Check for valid session
    const session = await getSession();

    let data;

    // Switch for different endpoints
    switch (endpoint) {
      case "artist":
        if (!artistId) {
          return new Response(
            JSON.stringify({ error: "Missing 'artistId' parameter" }),
            { status: 400 }
          );
        }
        data = await getArtistData(artistId);
        break;

      case "artist-albums":
        if (!artistId) {
          return new Response(
            JSON.stringify({ error: "Missing 'artistId' parameter" }),
            { status: 400 }
          );
        }
        data = await getArtistAlbums(artistId, session.accessToken);
        break;

      case "artist-top-tracks":
        if (!artistId) {
          return new Response(
            JSON.stringify({ error: "Missing 'artistId' parameter" }),
            { status: 400 }
          );
        }
        data = await getArtistTopTracks(artistId, session.accessToken);
        break;

      case "top-artists":
        data = await getTopArtists(timeRange);
        break;

      case "top-tracks":
        data = await getTopTracks(timeRange);
        break;

      case "top-genres":
        data = await getTopGenres(timeRange);
        break;

      case "recent-tracks":
        data = await getRecentTracks();
        break;

      case "total-listening-time":
        data = await getTotalListeningTime();
        break;

      case "time-per-artist":
        data = await getTimePerArtist();
        break;

      case "total-streams":
        data = await getTotalStreams();
        break;

      case "check-following":
        const artistIds = url.searchParams.getAll("artistIds");
        data = await CheckIfUserFollowsArtists(artistIds);
        break;

      case "stats":
      default:
        data = await getAllStats();
        break;
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const e = error as Error;
    if (e.message === "Unauthorized") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    console.error("Error fetching data:", e.message);
    return new Response("Server Error", { status: 500 });
  }
}
