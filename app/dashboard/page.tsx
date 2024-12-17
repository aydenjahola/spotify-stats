/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import UserInfo from "@/components/Dashboard/UserInfo";
import SpotifyInfo from "@/components/Dashboard/SpotifyInfo";
import SignOutButton from "@/components/Dashboard/SignOutButton";
import SpotifyError from "@/components/Dashboard/SpotifyError";

const CACHE_EXPIRY_TIME = 1000 * 60 * 2; // 2 minutes

export default function Dashboard() {
  const { data: session } = useSession();

  const [spotifyData, setSpotifyData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<string>("short_term");

  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  const [isLoadingSpotifyData, setIsLoadingSpotifyData] = useState(true);
  const [isLoadingRecentTracks, setIsLoadingRecentTracks] = useState(true);

  // function for fetching top genres
  const fetchTopGenres = useCallback(async () => {
    setIsLoadingGenres(true);
    try {
      const res = await fetch("/api/spotify-data?endpoint=top-genres");
      if (!res.ok) throw new Error("Failed to fetch Top Genres data.");
      const data = await res.json();
      setGenres(data);
      const timestamp = Date.now();
      // Cache the data with timestamp
      localStorage.setItem("top-genres", JSON.stringify({ data, timestamp }));
    } catch {
      setError("An error occurred while fetching genres data.");
    } finally {
      setIsLoadingGenres(false);
    }
  }, []);

  // function for fetching Spotify data (top artists and top tracks)
  const fetchSpotifyData = useCallback(async () => {
    setIsLoadingSpotifyData(true);
    try {
      const artistsRes = await fetch(
        `/api/spotify-data?endpoint=top-artists&time_range=${timeRange}`
      );
      if (!artistsRes.ok) throw new Error("Failed to fetch Top Artists data.");
      const artistsData = await artistsRes.json();

      const tracksRes = await fetch(
        `/api/spotify-data?endpoint=top-tracks&time_range=${timeRange}`
      );
      if (!tracksRes.ok) throw new Error("Failed to fetch Top Tracks data.");
      const tracksData = await tracksRes.json();

      setSpotifyData({
        "top-artists": artistsData.items,
        "top-tracks": tracksData.items,
      });

      const timestamp = Date.now();
      // Cache the data with timestamp
      localStorage.setItem(
        `top-artists-${timeRange}`,
        JSON.stringify({ data: artistsData.items, timestamp })
      );
      localStorage.setItem(
        `top-tracks-${timeRange}`,
        JSON.stringify({ data: tracksData.items, timestamp })
      );
    } catch {
      setError("An error occurred while fetching Spotify data.");
    } finally {
      setIsLoadingSpotifyData(false);
    }
  }, [timeRange]);

  // function for fetching recent tracks
  const fetchRecentTracks = useCallback(async () => {
    setIsLoadingRecentTracks(true);
    try {
      const res = await fetch("/api/spotify-data?endpoint=recent-tracks");
      if (!res.ok) throw new Error("Failed to fetch Recent Tracks data.");
      const data = await res.json();
      setRecentTracks(data.items);
      const timestamp = Date.now();
      // Cache the data with timestamp
      localStorage.setItem(
        "recent-tracks",
        JSON.stringify({ data: data.items, timestamp })
      );
    } catch {
      setError("An error occurred while fetching recent tracks data.");
    } finally {
      setIsLoadingRecentTracks(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      const cachedGenres = localStorage.getItem("top-genres");
      const cachedArtists = localStorage.getItem(`top-artists-${timeRange}`);
      const cachedTracks = localStorage.getItem(`top-tracks-${timeRange}`);
      const cachedRecentTracks = localStorage.getItem("recent-tracks");

      let dataLoaded = false; // Flag to check if data is loaded from cache or fetch

      const currentTime = Date.now();

      // Check if cached genres data is still valid
      if (cachedGenres) {
        const { data, timestamp } = JSON.parse(cachedGenres);
        if (currentTime - timestamp < CACHE_EXPIRY_TIME) {
          setGenres(data);
          dataLoaded = true;
        }
      }

      // Check if cached Spotify data is still valid
      if (cachedArtists && cachedTracks) {
        const { data: artistsData, timestamp: artistsTimestamp } =
          JSON.parse(cachedArtists);
        const { data: tracksData, timestamp: tracksTimestamp } =
          JSON.parse(cachedTracks);

        if (
          currentTime - artistsTimestamp < CACHE_EXPIRY_TIME &&
          currentTime - tracksTimestamp < CACHE_EXPIRY_TIME
        ) {
          setSpotifyData({
            "top-artists": artistsData,
            "top-tracks": tracksData,
          });
          dataLoaded = true;
        }
      }

      // Check if cached recent tracks data is still valid
      if (cachedRecentTracks) {
        const { data, timestamp } = JSON.parse(cachedRecentTracks);
        if (currentTime - timestamp < CACHE_EXPIRY_TIME) {
          setRecentTracks(data);
          dataLoaded = true;
        }
      }

      // If no data was loaded from cache, fetch new data
      if (!dataLoaded) {
        fetchSpotifyData();
        fetchTopGenres();
        fetchRecentTracks();
      } else {
        // Reset loading states if we have valid cached data
        setIsLoadingGenres(false);
        setIsLoadingSpotifyData(false);
        setIsLoadingRecentTracks(false);
      }
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
          isLoadingGenres={isLoadingGenres}
          isLoadingSpotifyData={isLoadingSpotifyData}
          isLoadingRecentTracks={isLoadingRecentTracks}
        />
      )}

      <SignOutButton />
    </main>
  );
}
