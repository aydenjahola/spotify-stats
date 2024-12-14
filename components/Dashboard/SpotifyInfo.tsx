/* eslint-disable @typescript-eslint/no-explicit-any */

import SpotifySection from "./SpotifySection";

interface SpotifyInfoProps {
  spotifyData: any;
  type?: string;
}

export default function SpotifyInfo({ spotifyData }: SpotifyInfoProps) {
  const topArtists = spotifyData?.["top-artists"] || [];
  const topTracks = spotifyData?.["top-tracks"] || [];

  if (topArtists.length === 0 && topTracks.length === 0) {
    return <p className="text-gray-500">Loading Spotify data...</p>;
  }

  return (
    <section className="space-y-8">
      <SpotifySection
        title="Top Spotify Artists"
        items={topArtists}
        type="artist"
      />
      <SpotifySection
        title="Top Spotify Tracks"
        items={topTracks}
        type="track"
      />
    </section>
  );
}
