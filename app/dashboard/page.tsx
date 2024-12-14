/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";
import SpotifyInfo from "@/components/SpotifyInfo";
import SignOutButton from "@/components/SignOutButton";

export default function Dashboard() {
  const { data: session } = useSession();
  const [spotifyData, setSpotifyData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Spotify data if session is available
    if (session) {
      fetchSpotifyData();
    }
  }, [session]);

  const fetchSpotifyData = async () => {
    try {
      const res = await fetch("/api/spotify-data");
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching Spotify data:", errorText);
        setError("Failed to fetch Spotify data.");
        return;
      }

      const data = await res.json();
      setSpotifyData(data);
    } catch (error) {
      console.error("Error in fetch:", error);
      setError("An error occurred while fetching data.");
    }
  };

  if (!session) {
    return <p>Loading...</p>;
  }

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
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <SpotifyInfo spotifyData={spotifyData} />
      )}
      <SignOutButton />
    </main>
  );
}
