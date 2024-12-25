"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AlbumInfo from "@/components/Album/AlbumInfo";
import TrackList from "@/components/Album/TrackList";
import { AlbumData } from "albums";

export default function AlbumPage() {
  const params = useParams();
  const albumId = params.albumId as string;
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!albumId) return;

    async function fetchAlbum() {
      try {
        const res = await fetch(
          `/api/spotify-data?endpoint=get-album-with-tracks&albumId=${albumId}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setAlbumData({
          id: albumId,
          name: data.name,
          release_date: data.release_date,
          total_tracks: data.total_tracks,
          imageUrl: data.imageUrl,
          tracks: { items: data.tracks },
        });
      } catch {
        setError("Failed to fetch album data.");
      }
    }

    fetchAlbum();
  }, [albumId]);

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!albumData)
    return (
      <div className="text-center text-gray-400">Loading album data...</div>
    );

  return (
    <main className="min-h-screen text-white p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <AlbumInfo albumData={albumData} />
        {albumData.tracks && <TrackList tracks={albumData.tracks.items} />}
      </div>
    </main>
  );
}
