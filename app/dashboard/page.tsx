/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserInfo from "@/components/Dashboard/UserInfo";
import SpotifyInfo from "@/components/Dashboard/SpotifyInfo";
import SignOutButton from "@/components/Dashboard/SignOutButton";
import SpotifyError from "@/components/Dashboard/SpotifyError";
import SpotifyGenres from "@/components/Dashboard/SpotifyGenres";

export default function Dashboard() {
  const { data: session } = useSession();
  const [spotifyData, setSpotifyData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      fetchSpotifyData();
      fetchTopGenres(); // Fetch the top genres as well
    }
  }, [session]);

  // Fetch Top Genres
  const fetchTopGenres = async () => {
    try {
      const res = await fetch("/api/spotify-data?endpoint=top-genres");
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching Top Genres data:", errorText);
        setError("Failed to fetch Top Genres data.");
        return;
      }
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      console.error("Error in fetch:", error);
      setError("An error occurred while fetching genres data.");
    }
  };

  const fetchSpotifyData = async () => {
    try {
      // Fetch top artists
      const artistsRes = await fetch(
        "/api/spotify-data?endpoint=top-artists&time_range=short_term"
      );
      if (!artistsRes.ok) {
        const errorText = await artistsRes.text();
        console.error("Error fetching Top Artists data:", errorText);
        setError("Failed to fetch Top Artists data.");
        return;
      }
      const artistsData = await artistsRes.json();

      // Fetch top tracks
      const tracksRes = await fetch(
        "/api/spotify-data?endpoint=top-tracks&time_range=short_term"
      );
      if (!tracksRes.ok) {
        const errorText = await tracksRes.text();
        console.error("Error fetching Top Tracks data:", errorText);
        setError("Failed to fetch Top Tracks data.");
        return;
      }
      const tracksData = await tracksRes.json();

      // Set the fetched data to the state (combine top artists and top tracks)
      setSpotifyData({
        "top-artists": artistsData.items,
        "top-tracks": tracksData.items,
      });
    } catch (error) {
      console.error("Error in fetch:", error);
      setError("An error occurred while fetching Spotify data.");
    }
  };

  if (!session) return <p>Loading...</p>;

  return (
    <main className="p-8">
      {session.user && (
        <UserInfo
          user={{
            name: session.user.name || "",
            email: session.user.email || "",
          }}
        />
      )}

      <SpotifyGenres genres={genres} error={error} />

      {error ? (
        <SpotifyError message={error} />
      ) : (
        <SpotifyInfo spotifyData={spotifyData} />
      )}
      <SignOutButton />
    </main>
  );
}
