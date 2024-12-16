import Link from "next/link";

interface TimePerArtistProps {
  timePerArtist: {
    [key: string]: { id: string; time: number };
  };
}

export default function TimePerArtist({ timePerArtist }: TimePerArtistProps) {
  return (
    <div className="p-8 bg-gradient-to-r from-purple-800 to-red-900 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-white">Top Artists</h3>
      {Object.entries(timePerArtist).length > 0 ? (
        <ul className="mt-4 space-y-3">
          {Object.entries(timePerArtist)
            .sort((a, b) => b[1].time - a[1].time) // Sort by time, not the name
            .slice(0, 5) // Show only top 5
            .map(([artist, { id, time }]) => (
              <li key={id} className="text-gray-300 text-lg">
                <Link href={`/artist/${encodeURIComponent(id)}`} passHref>
                  <span className="font-bold text-white hover:text-pink-500 transition-colors duration-200">
                    {artist}
                  </span>
                </Link>
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
