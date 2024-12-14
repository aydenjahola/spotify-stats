/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

interface SpotifyGenresProps {
  genres: any[];
  error: string | null;
}

export default function SpotifyGenres({ genres, error }: SpotifyGenresProps) {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (genres.length === 0) {
    return <p>No genres available.</p>;
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-6">Top Genres</h2>
      <div className="flex space-x-4 overflow-x-auto pb-8">
        {genres.slice(0, 5).map((genre, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h3 className="text-md1 font-bold text-white">{genre}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
