import { getAllStats } from "./stats";
import { getTopArtists } from "./top-artists";
import { getTopTracks } from "./top-tracks";
import { getTopGenres } from "./top-genres";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");
  const timeRange = url.searchParams.get("time_range") || "short_term";

  try {
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
      case "stats":
      default:
        data = await getAllStats();
        break;
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Type assertion: assume error is an instance of Error
    const e = error as Error;
    console.error("Error fetching data:", e.message);
    return new Response("Server Error", { status: 500 });
  }
}
