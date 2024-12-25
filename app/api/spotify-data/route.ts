/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { getAlbum } from "./get-album";
import { getAlbumTracks } from "./get-album-tracks";
import { saveAlbum } from "./save-album";
import { removeAlbum } from "./delete-album";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");
  const artistId = url.searchParams.get("artistId");
  const timeRange = url.searchParams.get("time_range") || "short_term";

  try {
    // Check for valid session
    const session = await getSession();

    let data;

    const albumId = url.searchParams.get("albumId");

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

      case "get-album-with-tracks":
        if (!albumId) {
          return new Response(
            JSON.stringify({ error: "Missing 'albumId' parameter" }),
            { status: 400 }
          );
        }

        const albumData = await getAlbum(albumId, session.accessToken);

        const albumTracks = await getAlbumTracks(albumId, session.accessToken);

        const tracksWithImages = albumTracks.items.map((track: any) => ({
          ...track,
          imageUrl: albumData.images?.[0]?.url || "",
        }));

        data = {
          name: albumData.name || "Unknown Album",
          release_date: albumData.release_date || "Unknown Date",
          total_tracks: albumData.total_tracks || 0,
          imageUrl: albumData.images?.[0]?.url || "",
          tracks: tracksWithImages,
        };
        break;

      case "save-album":
        if (!albumId) {
          return new Response(
            JSON.stringify({ error: "Missing 'albumId' parameter" }),
            { status: 400 }
          );
        }
        data = await saveAlbum(albumId);
        break;

      case "remove-album":
        if (!albumId) {
          return new Response(
            JSON.stringify({ error: "Missing 'albumId' parameter" }),
            { status: 400 }
          );
        }
        data = await removeAlbum(albumId);
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

export async function POST(request: Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");
  const albumId = url.searchParams.get("albumId");

  if (endpoint === "save-album") {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        return new Response(
          JSON.stringify({ error: "Unauthorized, no access token found" }),
          { status: 401 }
        );
      }

      const { success, message } = await saveAlbum(albumId as string);
      return new Response(JSON.stringify({ success, message }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      const e = error as Error;
      console.error("Error saving album:", e.message);
      return new Response(
        JSON.stringify({ error: "Failed to save the album" }),
        { status: 500 }
      );
    }
  }

  if (endpoint === "remove-album") {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        return new Response(
          JSON.stringify({ error: "Unauthorized, no access token found" }),
          { status: 401 }
        );
      }

      const { success, message } = await removeAlbum(albumId as string);
      return new Response(JSON.stringify({ success, message }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      const e = error as Error;
      console.error("Error removing album:", e.message);
      return new Response(
        JSON.stringify({ error: "Failed to remove the album" }),
        { status: 500 }
      );
    }
  }

  // Default case for unsupported POST endpoints
  return new Response(
    JSON.stringify({ error: "Invalid or unsupported endpoint" }),
    { status: 400 }
  );
}
