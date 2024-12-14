/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";

export default function ProfileDetails() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  // Extracting relevant data from session
  const {
    email,
    name,
    id,
    followers,
    country,
    product,
    playlists,
    totalPlaylists,
  } = session.user || {};

  return (
    <section className="mt-8 p-6 bg-gray-800 rounded-lg">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Profile Details
      </h3>

      <div className="mt-4">
        <p className="text-lg text-gray-300">Email: {email}</p>
        <p className="text-lg text-gray-300">Username: {name}</p>
        <p className="text-lg text-gray-300">Spotify ID: {id}</p>
        <p className="text-lg text-gray-300">
          Followers: {followers?.toLocaleString()}
        </p>
        <p className="text-lg text-gray-300">Country: {country}</p>
        <p className="text-lg text-gray-300">Subscription: {product}</p>
        <p className="text-lg text-gray-300">
          Total Playlists: {totalPlaylists}
        </p>

        {playlists && playlists.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg text-gray-300">Public Playlists:</h4>
            <ul className="space-y-2">
              {playlists.map((playlist: any) => (
                <li key={playlist.id} className="text-gray-300">
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    {playlist.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-lg text-gray-300 mt-4">
          <a
            href={`https://open.spotify.com/user/${id}`}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            View Spotify Profile
          </a>
        </p>
      </div>
    </section>
  );
}
