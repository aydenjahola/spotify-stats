/* eslint-disable @typescript-eslint/no-explicit-any */

import SpotifySection from "./SpotifySection";
import RecentTracks from "./RecentTracks";

interface SpotifyInfoProps {
  spotifyData: any;
  recentTracks: any[];
  genres: any[];
  error: string | null;
}

export default function SpotifyInfo({
  spotifyData,
  recentTracks,
  genres,
}: SpotifyInfoProps) {
  const topArtists = spotifyData?.["top-artists"] || [];
  const topTracks = spotifyData?.["top-tracks"] || [];

  if (
    topArtists.length === 0 &&
    topTracks.length === 0 &&
    recentTracks.length === 0 &&
    genres.length === 0
  ) {
    return <p className="text-gray-500">Loading Spotify data...</p>;
  }

  return (
    <section className="space-y-8">
      <SpotifySection title="Top Genres" items={genres} type="genre" />

      <SpotifySection title="Top Artists " items={topArtists} type="artist" />
      <SpotifySection title="Top Tracks" items={topTracks} type="track" />
      <RecentTracks
        title="Recently Played Tracks"
        recentTracks={recentTracks}
      />
    </section>
  );
}
