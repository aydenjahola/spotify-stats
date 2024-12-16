"use client";

import { useEffect, useState } from "react";

export default function TotalListeningTime() {
  const [totalListeningTime, setTotalListeningTime] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetch("/api/spotify-data?endpoint=total-listening-time")
      .then((res) => res.json())
      .then((data) => {
        const time = parseFloat(data.totalListeningTime);
        setTotalListeningTime(Number(time.toFixed(2)));
      });
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-green-800 to-blue-900 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-white">Total Listening Time</h3>
      <p className="text-5xl font-extrabold text-white mt-4">
        {totalListeningTime !== null
          ? `${totalListeningTime} mins`
          : "Loading..."}
      </p>
      <p className="text-gray-400 mt-2">Past 4 Weeks</p>
    </div>
  );
}
