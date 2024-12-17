/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import UserInfo from "@/components/Dashboard/UserInfo";
import SpotifyInfo from "@/components/Dashboard/SpotifyInfo";
import SignOutButton from "@/components/Dashboard/SignOutButton";
import SpotifyError from "@/components/Dashboard/SpotifyError";
import { useCallback } from "react";

const fetchSpotifyData = async (
  endpoint: string,
  params: Record<string, string>
) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/spotify-data?endpoint=${endpoint}&${query}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState<string>("short_term");
  const [genres, setGenres] = useState<any>(null);
  const [spotifyData, setSpotifyData] = useState<any>(null);
  const [recentTracks, setRecentTracks] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loadSpotifyData = useCallback(async () => {
    try {
      const [fetchedGenres, artistsData, tracksData, fetchedRecentTracks] =
        await Promise.all([
          fetchSpotifyData("top-genres", {}),
          fetchSpotifyData("top-artists", { time_range: timeRange }),
          fetchSpotifyData("top-tracks", { time_range: timeRange }),
          fetchSpotifyData("recent-tracks", {}),
        ]);

      setGenres(fetchedGenres);
      setSpotifyData({
        "top-artists": artistsData.items,
        "top-tracks": tracksData.items,
      });
      setRecentTracks(fetchedRecentTracks.items);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }, [timeRange]);

  useEffect(() => {
    if (session) {
      loadSpotifyData();
    }
  }, [session, timeRange, loadSpotifyData, setGenres, setSpotifyData]);

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
          isLoadingGenres={!genres}
          isLoadingSpotifyData={!spotifyData}
          isLoadingRecentTracks={!recentTracks}
        />
      )}

      <SignOutButton />
    </main>
  );
}
