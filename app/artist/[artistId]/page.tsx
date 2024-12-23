/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArtistHeader from "@/components/Artist/ArtistHeader";
import AlbumsSection from "@/components/Artist/AlbumsSection";
import TopTracksSection from "@/components/Artist/TopTracksSection";
import ErrorMessage from "@/components/Artist/ErrorMessage";
import Spinner from "@/components/Common/Spinner";

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [followsArtist, setFollowsArtist] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId) return;

    async function fetchData(
      endpoint: string,
      setter: (data: any) => void,
      errorMsg: string
    ) {
      try {
        const res = await fetch(
          `/api/spotify-data?endpoint=${endpoint}&artistId=${artistId}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(errorMsg);
      }
    }

    async function fetchFollowStatus() {
      try {
        const res = await fetch(
          `/api/spotify-data?endpoint=check-following&artistIds=${artistId}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setFollowsArtist(data[0]); // Spotify API returns an array of booleans
      } catch (err) {
        console.error("Error fetching follow status:", err);
        setError("Failed to fetch follow status.");
      }
    }

    fetchData("artist", setArtistData, "Failed to fetch artist data.");
    fetchData("artist-albums", setAlbums, "Failed to fetch artist's albums.");
    fetchData(
      "artist-top-tracks",
      setTopTracks,
      "Failed to fetch artist's top tracks."
    );
    fetchFollowStatus();
  }, [artistId]);

  if (error) return <ErrorMessage message={error} />;
  if (!artistData) return <Spinner message="Loading artist data..." />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-12 flex flex-col items-center justify-center space-y-12">
      <ArtistHeader artistData={artistData} followsArtist={followsArtist} />
      <AlbumsSection albums={albums} />
      <TopTracksSection topTracks={topTracks} />
    </main>
  );
}
