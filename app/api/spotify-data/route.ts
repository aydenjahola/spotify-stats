/* eslint-disable @typescript-eslint/no-unused-vars */

import { getAllStats } from "./stats";
import { getTopArtists } from "./top-artists";
import { getTopTracks } from "./top-tracks";
import { getTopGenres } from "./top-genres";
import { getRecentTracks } from "./recent-tracks";

import { getSession } from "./auth";
import { getTotalListeningTime } from "./total-listening-time";
import { getTimePerArtist } from "./time-per-artist";
import { getTotalStreams } from "./total-streams";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");
  const timeRange = url.searchParams.get("time_range") || "short_term";

  try {
    // Check for valid session
    const session = await getSession();

    // If the session is not authorized, we already handle it inside getSession
    // Now proceed to handle the request for different endpoints
    let data;

    switch (endpoint) {
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
      case "stats":
      default:
        data = await getAllStats();
        break;
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Check if error is "Unauthorized" and return a 401 response
    const e = error as Error;
    if (e.message === "Unauthorized") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Log server error and return 500 if not Unauthorized
    console.error("Error fetching data:", e.message);
    return new Response("Server Error", { status: 500 });
  }
}
