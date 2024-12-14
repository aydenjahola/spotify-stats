/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface SpotifyArtistCardProps {
  artist: any;
}

export default function SpotifyArtistCard({ artist }: SpotifyArtistCardProps) {
  return (
    <li className="card card-compact w-80 bg-gradient-to-r from-indigo-400 to-purple-500 shadow-lg hover:shadow-2xl transition-all">
      <figure>
        <Image
          src={artist.images[0]?.url || "/default-image.jpg"}
          alt={artist.name}
          width={200}
          height={200}
          className="rounded-full"
        />
      </figure>
      <div className="card-body text-white">
        <h3 className="card-title text-2xl font-bold">{artist.name}</h3>
        <p className="text-lg">Followers: {artist.followers?.total}</p>
      </div>
    </li>
  );
}
