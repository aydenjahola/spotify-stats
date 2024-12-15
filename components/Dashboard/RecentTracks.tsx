/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface RecentTracksProps {
  title: string;
  recentTracks: any[];
}

export default function RecentTracks({
  title,
  recentTracks,
}: RecentTracksProps) {
  if (recentTracks.length === 0) {
    return <p className="text-gray-500">No recent tracks available.</p>;
  }

  return (
    <section className="mt-12">
      <h2 className="text-4xl font-semibold mb-6">{title}</h2>
      <ul className="space-y-6">
        {recentTracks.map((item: any, index: number) => {
          const track = item.track || {};
          const playedAt = new Date(item.played_at).toLocaleString() || "N/A";

          const album = track.album || {};
          const artists = track.artists || [];

          const albumImageUrl =
            album.images && album.images.length > 0
              ? album.images[0].url
              : "/default-image.jpg";

          const trackName = track.name || "Unknown Track";
          const artistName = artists?.[0]?.name || "Unknown Artist";
          const albumName = album.name || "Unknown Album";

          const uniqueKey = `${track.id}-${index}`;

          return (
            <li
              key={uniqueKey}
              className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={albumImageUrl}
                  alt={trackName}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="text-white">
                  <h3 className="text-xl font-semibold">
                    {index + 1}. {trackName}
                  </h3>
                  <p className="text-sm">Artist: {artistName}</p>
                  <p className="text-sm italic">Album: {albumName}</p>
                  <p className="text-sm">Played At: {playedAt}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
