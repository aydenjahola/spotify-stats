/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";

interface SpotifyArtistCardProps {
  artist: any;
}

export default function SpotifyArtistCard({ artist }: SpotifyArtistCardProps) {
  return (
    <li className="card card-compact w-80 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <Link href={`/artist/${artist.id}`}>
        <figure className="w-40 h-40 mx-auto mt-4 mb-2">
          <Image
            src={artist.images[0]?.url || "/default-image.jpg"}
            alt={artist.name}
            width={125}
            height={160}
            className="rounded-full object-cover border-4 border-white"
          />
        </figure>
        <div className="card-body p-4 space-y-2 text-white">
          <h3 className="card-title text-xl font-semibold text-white truncate">
            {" "}
            {/* Use dynamic URL path */}
            {artist.index + 1}. {artist.name}
          </h3>
          <p className="text-lg text-white/90">
            Followers: {artist.followers?.total.toLocaleString()}
          </p>
          <p className="text-lg text-white/90">
            Popularity: {artist.popularity?.toLocaleString()}
          </p>
        </div>
      </Link>
    </li>
  );
}
