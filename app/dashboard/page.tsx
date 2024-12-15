/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
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

  // Memoized function for fetching top genres
  const fetchTopGenres = useCallback(async () => {
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
  }, []);

  // Memoized function for fetching Spotify data (top artists and top tracks)
  const fetchSpotifyData = useCallback(async () => {
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
  }, [timeRange]);

  // Memoized function for fetching recent tracks
  const fetchRecentTracks = useCallback(async () => {
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
  }, []);

  // useEffect to fetch data when session or timeRange changes
  useEffect(() => {
    if (session) {
      fetchSpotifyData();
      fetchTopGenres();
      fetchRecentTracks();
    }
  }, [session, timeRange, fetchSpotifyData, fetchTopGenres, fetchRecentTracks]);

  const handleTimeRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeRange(event.target.value);
  };

  if (!session) return <p>Loading...</p>;

  return (
    <main className="relative p-8">
      {/* Gradient and Blur Background */}
      <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

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
