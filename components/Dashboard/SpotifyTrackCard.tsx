/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface SpotifyTrackCardProps {
  track: any;
}

export default function SpotifyTrackCard({ track }: SpotifyTrackCardProps) {
  return (
    <li className="card card-compact w-80 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg hover:shadow-2xl transition-all">
      <figure>
        <Image
          src={track.album.images[0]?.url || "/default-image.jpg"}
          alt={track.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </figure>
      <div className="card-body text-white">
        <h3 className="card-title text-2xl font-bold">{track.name}</h3>
        <p className="text-lg">Artist: {track.artists[0]?.name}</p>
        <p className="text-sm italic">Album: {track.album.name}</p>
      </div>
    </li>
  );
}
