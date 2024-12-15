/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserInfo from "@/components/Dashboard/UserInfo";
import SpotifyInfo from "@/components/Dashboard/SpotifyInfo";
import SignOutButton from "@/components/Dashboard/SignOutButton";
import SpotifyError from "@/components/Dashboard/SpotifyError";

export default function Dashboard() {
  const { data: session } = useSession();
  const [spotifyData, setSpotifyData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<string>("short_term");

  useEffect(() => {
    if (session) {
      fetchSpotifyData();
      fetchTopGenres();
      fetchRecentTracks();
    }
  }, [session, timeRange]);

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
      const artistsRes = await fetch(
        `/api/spotify-data?endpoint=top-artists&time_range=${timeRange}`
      );
      if (!artistsRes.ok) {
        const errorText = await artistsRes.text();
        console.error("Error fetching Top Artists data:", errorText);
        setError("Failed to fetch Top Artists data.");
        return;
      }
      const artistsData = await artistsRes.json();

      const tracksRes = await fetch(
        `/api/spotify-data?endpoint=top-tracks&time_range=${timeRange}`
      );
      if (!tracksRes.ok) {
        const errorText = await tracksRes.text();
        console.error("Error fetching Top Tracks data:", errorText);
        setError("Failed to fetch Top Tracks data.");
        return;
      }
      const tracksData = await tracksRes.json();

      setSpotifyData({
        "top-artists": artistsData.items,
        "top-tracks": tracksData.items,
      });
    } catch (error) {
      console.error("Error in fetch:", error);
      setError("An error occurred while fetching Spotify data.");
    }
  };

  const fetchRecentTracks = async () => {
    try {
      const res = await fetch("/api/spotify-data?endpoint=recent-tracks");
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching Recent Tracks data:", errorText);
        setError("Failed to fetch Recent Tracks data.");
        return;
      }
      const data = await res.json();
      setRecentTracks(data.items);
    } catch (error) {
      console.error("Error in fetch:", error);
      setError("An error occurred while fetching recent tracks data.");
    }
  };

  const handleTimeRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeRange(event.target.value);
  };

  if (!session) return <p>Loading...</p>;

  return (
    <main className="p-8 relative">
      {session.user && (
        <UserInfo
          user={{
            name: session.user.name || "",
            email: session.user.email || "",
          }}
        />
      )}

      {/* Dropdown for selecting time range */}
      <div className="absolute right-8 mb-12">
        <select
          id="timeRange"
          value={timeRange}
          onChange={handleTimeRangeChange}
          className="px-8 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="short_term">4 weeks</option>
          <option value="medium_term">6 months</option>
          <option value="long_term">Lifetime</option>
        </select>
      </div>

      {error ? (
        <SpotifyError message={error} />
      ) : (
        <SpotifyInfo
          spotifyData={spotifyData}
          recentTracks={recentTracks}
          genres={genres}
          error={error}
        />
      )}

      <SignOutButton />
    </main>
  );
}
