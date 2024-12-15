/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId) return;

    async function fetchArtistData() {
      try {
        const res = await fetch(
          `/api/spotify-data?endpoint=artist&artistId=${artistId}`
        );
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error fetching artist data:", errorText);
          setError("Failed to fetch artist data.");
          return;
        }
        const data = await res.json();
        setArtistData(data);
      } catch (err) {
        console.error("Error in fetch:", err);
        setError("An error occurred while fetching artist data.");
      }
    }

    async function fetchAlbums() {
      try {
        const res = await fetch(
          `/api/spotify-data?endpoint=artist-albums&artistId=${artistId}`
        );
        const data = await res.json();
        setAlbums(data);
      } catch (err) {
        console.error("Error fetching albums:", err);
        setError("Failed to fetch artist's albums.");
      }
    }

    async function fetchTopTracks() {
      try {
        const res = await fetch(
          `/api/spotify-data?endpoint=artist-top-tracks&artistId=${artistId}`
        );
        const data = await res.json();
        setTopTracks(data);
      } catch (err) {
        console.error("Error fetching top tracks:", err);
        setError("Failed to fetch artist's top tracks.");
      }
    }

    fetchArtistData();
    fetchAlbums();
    fetchTopTracks();
  }, [artistId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!artistData)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-12 flex flex-col items-center justify-center space-y-12">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            {artistData.name}
          </span>
        </h1>

        <div className="relative w-72 h-72 mx-auto rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Image
            src={artistData.images?.[0]?.url || "/default-image.jpg"}
            alt={artistData.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="space-y-6 mt-8">
          <p className="text-xl font-light opacity-75">
            Followers:{" "}
            <span className="font-semibold text-indigo-400">
              {artistData.followers?.total.toLocaleString()}
            </span>
          </p>
          <p className="text-xl font-light opacity-75">
            Genres:{" "}
            <span className="font-semibold text-indigo-400">
              {artistData.genres.join(", ")}
            </span>
          </p>
          <p className="text-xl font-light opacity-75">
            Popularity:{" "}
            <span className="font-semibold text-indigo-400">
              {artistData.popularity}
            </span>
          </p>
        </div>
      </div>

      {/* Albums Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {albums.map((album: any) => (
            <div
              key={album.id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors duration-300"
            >
              <Image
                src={album.images[0]?.url || "/default-image.jpg"}
                alt={album.name}
                width={220}
                height={220}
                className="rounded-xl object-cover"
              />
              <p className="mt-4 text-xl font-medium">{album.name}</p>
              <p className="text-sm text-gray-400">
                Released: {album.release_date}
              </p>
              <p className="text-sm text-gray-400">
                Tracks: {album.total_tracks}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Tracks Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Top Tracks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {topTracks.map((track: any) => (
            <div
              key={track.id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
            >
              <Image
                src={track.album.images[0]?.url || "/default-image.jpg"}
                alt={track.name}
                width={220}
                height={220}
                className="rounded-xl object-cover"
              />
              <p className="mt-4 text-xl font-medium">{track.name}</p>
              <p className="text-sm text-gray-400">{track.album.name}</p>
              <p className="text-sm text-gray-400">
                {Math.floor(track.duration_ms / 60000)}m{" "}
                {Math.floor((track.duration_ms % 60000) / 1000)}s
              </p>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 font-semibold hover:underline mt-4 inline-block"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
