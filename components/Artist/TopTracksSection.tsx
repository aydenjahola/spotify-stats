/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface TopTracksSectionProps {
  topTracks: any[];
}

export default function TopTracksSection({ topTracks }: TopTracksSectionProps) {
  return (
    <section className="space-y-8 w-full px-4 sm:px-8">
      <span className="text-3xl sm:text-3xl font-bold text-center sm:text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Top Tracks
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topTracks.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 p-4"
          >
            <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden">
              <Image
                src={track.album.images[0]?.url || "/default-image.jpg"}
                alt={track.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white truncate">
                {track.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                Album: {track.album.name}
              </p>
              <p className="text-sm text-gray-400">
                Duration: {Math.floor(track.duration_ms / 60000)}m{" "}
                {Math.floor((track.duration_ms % 60000) / 1000)}s
              </p>

              <button className="px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  Listen on Spotify
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
