"use client";

import { useEffect, useState } from "react";

export default function TimePerArtist() {
  const [timePerArtist, setTimePerArtist] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    fetch("/api/spotify-data?endpoint=time-per-artist")
      .then((res) => res.json())
      .then((data) => setTimePerArtist(data));
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-purple-800 to-red-900 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-white">Top Artists</h3>
      {Object.entries(timePerArtist).length > 0 ? (
        <ul className="mt-4 space-y-3">
          {Object.entries(timePerArtist)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([artist, time]) => (
              <li key={artist} className="text-gray-300 text-lg">
                <span className="font-bold text-white">{artist}</span>
                <span className="ml-2 text-gray-400">
                  — {time.toFixed(2)} mins
                </span>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-400 mt-4">No data available</p>
      )}
      <p className="text-gray-400 mt-2">Past 4 Weeks</p>
    </div>
  );
}
