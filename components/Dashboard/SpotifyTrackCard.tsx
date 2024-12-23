/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface SpotifyTrackCardProps {
  track: any;
}

export default function SpotifyTrackCard({ track }: SpotifyTrackCardProps) {
  return (
    <li className="w-80 h-[400px] bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-xl shadow-xl transform transition-all hover:shadow-2xl hover:ring-2 hover:ring-offset-2 hover:ring-white overflow-hidden">
      <figure className="w-full h-48 relative overflow-hidden rounded-t-xl">
        <Image
          src={track.album.images[0]?.url || "/default-image.jpg"}
          alt={track.name}
          width={200}
          height={200}
          className="w-full h-full object-cover transform transition-transform hover:scale-110"
        />
      </figure>
      <div className="px-6 py-4 space-y-3">
        <h3 className="text-2xl font-semibold text-white truncate">
          {track.index + 1}. {track.name}
        </h3>
        <p className="text-lg text-gray-100 font-medium">
          {track.artists[0]?.name}
        </p>
        <p className="text-sm text-gray-300 italic">
          Album: {track.album.name}
        </p>
      </div>
      <div className="px-6 py-3 mt-4 flex">
        <a
          href={track.external_urls.spotify}
          className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-600 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Listen on Spotify
        </a>
      </div>
    </li>
  );
}
