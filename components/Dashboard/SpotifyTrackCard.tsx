/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface SpotifyTrackCardProps {
  track: any;
}

export default function SpotifyTrackCard({ track }: SpotifyTrackCardProps) {
  return (
    <li className="card card-compact w-80 bg-gradient-to-r from-green-400 to-blue-500 shadow-xl hover:shadow-2xl rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <figure className="w-full h-48 overflow-hidden rounded-t-xl">
        <Image
          src={track.album.images[0]?.url || "/default-image.jpg"}
          alt={track.name}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body space-y-2 p-4 text-white">
        <h3 className="card-title text-xl font-semibold text-white truncate">
          {track.index + 1}. {track.name}
        </h3>
        <p className="text-lg font-medium">{track.artists[0]?.name}</p>
        <p className="text-sm text-gray-200 italic">
          Album: {track.album.name}
        </p>
      </div>
      <div className="card-actions justify-between p-4">
        <a
          href={track.external_urls.spotify}
          className="btn btn-sm text-white hover:bg-white hover:text-black"
          target="_blank"
          rel="noopener noreferrer"
        >
          Listen on Spotify
        </a>
      </div>
    </li>
  );
}
