/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";

interface SpotifyArtistCardProps {
  artist: any;
}

export default function SpotifyArtistCard({ artist }: SpotifyArtistCardProps) {
  return (
    <li className="card card-compact w-80 h-96 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 rounded-3xl shadow-xl transform transition-all hover:shadow-2xl hover:ring-2 hover:ring-white hover:ring-opacity-40">
      <Link href={`/artist/${artist.id}`}>
        <figure className="w-40 h-40 mx-auto mt-6 mb-4 relative">
          <Image
            src={artist.images[0]?.url || "/default-image.jpg"}
            alt={artist.name}
            width={130}
            height={130}
            className="rounded-full object-cover border-8 border-white shadow-xl transform transition-all hover:scale-110"
          />
        </figure>
        <div className="card-body text-white p-6">
          <h3 className="card-title text-2xl font-bold text-white tracking-wide">
            {artist.index + 1}. {artist.name}
          </h3>
          <div className="flex items-center space-x-4 text-lg text-white/90">
            <span className="badge badge-accent badge-outline">Followers:</span>
            <span className="font-semibold">
              {artist.followers?.total.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-lg text-white/90">
            <span className="badge badge-accent badge-outline">
              Popularity:
            </span>
            <span className="font-semibold">
              {artist.popularity?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-wrap space-x-4 text-sm text-white">
            <span
              className="tooltip"
              data-tip="Click to view artist's full profile"
            >
              <button className="btn btn-ghost btn-sm text-white hover:bg-white/10 transition-all rounded-full w-full sm:w-auto">
                <span className="iconify" data-icon="mdi:account" /> View
                Profile
              </button>
            </span>
            <span className="tooltip" data-tip="Follow this artist on Spotify">
              <button className="btn btn-ghost btn-sm text-white hover:bg-white/10 transition-all rounded-full w-full sm:w-auto">
                <span className="iconify" data-icon="mdi:spotify" /> Follow
              </button>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
