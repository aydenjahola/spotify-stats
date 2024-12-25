import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Track } from "albums";

interface TrackItemProps {
  track: Track;
}

export default function TrackItem({ track }: TrackItemProps) {
  return (
    <li className="bg-transparent backdrop-blur-lg border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center space-x-4">
        {track.imageUrl ? (
          <Image
            src={track.imageUrl}
            alt={track.name}
            width={80}
            height={80}
            className="object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-700 rounded-lg"></div>
        )}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-white">
              {track.name}
            </span>
            <span className="text-sm text-gray-400">
              {Math.floor(track.duration_ms / 60000)}:
              {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {track.artists.map((artist, idx) => (
              <span
                key={artist.id}
                className="hover:text-pink-500 cursor-pointer"
              >
                <Link href={`/artist/${artist.id}`} passHref>
                  <span className="underline">{artist.name}</span>
                </Link>
                {idx < track.artists.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-400 mt-2">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400 hover:text-blue-600"
            >
              Listen on Spotify
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
