/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

interface SpotifyInfoProps {
  spotifyData: any;
}

const SpotifyInfo = ({ spotifyData }: SpotifyInfoProps) => {
  if (!spotifyData) return <p>Loading Spotify data...</p>;

  // Extract top artists data
  const topArtists = spotifyData.items || [];

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-semibold">Top Spotify Artists</h2>

      {topArtists.length === 0 ? (
        <p>No top artists available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {topArtists.map((artist: any) => (
            <li key={artist.id} className="border p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <Image
                  src={artist.images[0]?.url || "/default-image.jpg"}
                  alt={artist.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                  priority={true}
                />
                <div>
                  <h3 className="font-bold text-lg">{artist.name}</h3>
                  <p className="text-sm text-gray-500">
                    Followers: {artist.followers?.total}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SpotifyInfo;
