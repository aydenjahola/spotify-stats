"use client";

import { useEffect, useState } from "react";

export default function TotalStreams() {
  const [totalStreams, setTotalStreams] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/spotify-data?endpoint=total-streams")
      .then((res) => res.json())
      .then((data) => {
        const currentTotal = data.totalStreams;
        setTotalStreams(currentTotal);
      });
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-800 to-purple-900 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-white">Total Streams</h3>
      <p className="text-6xl font-extrabold text-white mt-4">
        {totalStreams !== null ? totalStreams.toLocaleString() : "Loading..."}
      </p>
      <p className="text-gray-400 mt-2">Past 4 Weeks</p>
    </div>
  );
}
