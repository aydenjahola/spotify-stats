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
    return (
      <p className="text-gray-500 text-center">No recent tracks available.</p>
    );
  }

  return (
    <section className="mt-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        {title}
      </h2>

      <ul className="space-y-6 mt-8">
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
              className="flex flex-col sm:flex-row items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 duration-300"
            >
              <div className="relative w-24 sm:w-32 sm:h-32 h-24 rounded-md overflow-hidden">
                <Image
                  src={albumImageUrl}
                  alt={trackName}
                  width={120}
                  height={120}
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 25vw, 20vw"
                />
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 w-full text-white flex-1">
                <h3 className="text-xl font-semibold line-clamp-1">
                  {index + 1}. {trackName}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Artist: <span className="font-medium">{artistName}</span>
                </p>
                <p className="text-sm text-gray-300 italic">
                  Album: <span className="font-medium">{albumName}</span>
                </p>
                <p className="text-sm text-gray-300">
                  Played At: <span className="font-medium">{playedAt}</span>
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-auto sm:self-center flex-shrink-0">
                <a
                  href={track.external_urls.spotify}
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-600 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen on Spotify
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
