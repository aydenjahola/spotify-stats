import React from "react";
import { Track } from "albums";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({ tracks }: TrackListProps) {
  if (tracks.length === 0) {
    return <div className="text-gray-400">No tracks found.</div>;
  }

  return (
    <section className="tracks mt-8">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8">
        Tracks
      </h2>
      <ul className="space-y-6">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </ul>
    </section>
  );
}
