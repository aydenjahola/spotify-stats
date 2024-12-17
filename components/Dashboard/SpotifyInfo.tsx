/* eslint-disable @typescript-eslint/no-explicit-any */
import SpotifySection from "./SpotifySection";
import RecentTracks from "./RecentTracks";
import Spinner from "@/components/Common/Spinner";

interface SpotifyInfoProps {
  spotifyData: {
    "top-artists": any[];
    "top-tracks": any[];
  } | null;
  recentTracks: any[];
  genres: any[];
  isLoadingGenres: boolean;
  isLoadingSpotifyData: boolean;
  isLoadingRecentTracks: boolean;
}

export default function SpotifyInfo({
  spotifyData,
  recentTracks,
  genres,
  isLoadingGenres,
  isLoadingSpotifyData,
  isLoadingRecentTracks,
}: SpotifyInfoProps) {
  if (isLoadingGenres || isLoadingSpotifyData || isLoadingRecentTracks) {
    return <Spinner message="Loading your Spotify data..." />;
  }

  if (!spotifyData && !recentTracks.length && !genres.length) {
    return <p className="text-gray-500">No data available.</p>;
  }

  const topArtists = spotifyData?.["top-artists"] || [];
  const topTracks = spotifyData?.["top-tracks"] || [];

  return (
    <section className="space-y-8">
      <SpotifySection title="Top Genres" items={genres} type="genre" />
      <SpotifySection title="Top Artists" items={topArtists} type="artist" />
      <SpotifySection title="Top Tracks" items={topTracks} type="track" />
      <RecentTracks
        title="Recently Played Tracks"
        recentTracks={recentTracks}
      />
    </section>
  );
}
