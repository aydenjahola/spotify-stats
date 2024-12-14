import { getTopArtists } from "./top-artists";
import { getTopTracks } from "./top-tracks";
import { getTopGenres } from "./top-genres";

export async function getAllStats() {
  const stats = {
    topArtists: await getTopArtists("long_term"),
    topTracks: await getTopTracks("long_term"),
    topGenres: await getTopGenres("long_term"), // Fetch top genres
  };
  return stats;
}
