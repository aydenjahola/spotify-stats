/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

interface ArtistHeaderProps {
  artistData: any;
  followsArtist: boolean | null;
}

export default function ArtistHeader({
  artistData,
  followsArtist,
}: ArtistHeaderProps) {
  return (
    <div className="max-w-5xl w-full text-center">
      <h1 className="text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          {artistData.name}
        </span>
      </h1>

      <div className="relative w-72 h-72 mx-auto rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <Image
          src={artistData.images?.[0]?.url || "/default-image.jpg"}
          alt={artistData.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="space-y-6 mt-8">
        <p className="text-xl font-light opacity-75">
          Followers:{" "}
          <span className="font-semibold text-indigo-400">
            {artistData.followers?.total.toLocaleString()}
          </span>
        </p>
        <p className="text-xl font-light opacity-75">
          Genres:{" "}
          <span className="font-semibold text-indigo-400">
            {artistData.genres.join(", ")}
          </span>
        </p>
        <p className="text-xl font-light opacity-75">
          Popularity:{" "}
          <span className="font-semibold text-indigo-400">
            {artistData.popularity}
          </span>
        </p>
        <p className="text-xl font-light opacity-75">
          Following:{" "}
          <span className="font-semibold text-indigo-400">
            {followsArtist === null
              ? "Loading..."
              : followsArtist
              ? "Yes"
              : "No"}
          </span>
        </p>
        <button className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
          <a
            href={artistData.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            View on Spotify
          </a>
        </button>
      </div>
    </div>
  );
}
