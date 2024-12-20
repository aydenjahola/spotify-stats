"use client";

import { useSession } from "next-auth/react";

export default function ProfileDetails() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  // Extracting relevant data from session
  const { email, name, id, followers, country, product } = session.user || {};

  return (
    <section className="mt-8 p-6 bg-gray-800 rounded-lg">
      <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Profile Details
      </span>

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
