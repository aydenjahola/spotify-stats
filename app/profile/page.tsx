"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import TotalStreams from "@/components/Profile/TotalStreams";
import TotalListeningTime from "@/components/Profile/TotalListeningTime";
import TimePerArtist from "@/components/Profile/TimePerArtist";
import Spinner from "@/components/Common/Spinner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalStreams: 0,
    totalListeningTime: 0,
    timePerArtist: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [streamsRes, listeningTimeRes, timePerArtistRes] =
          await Promise.all([
            fetch("/api/spotify-data?endpoint=total-streams"),
            fetch("/api/spotify-data?endpoint=total-listening-time"),
            fetch("/api/spotify-data?endpoint=time-per-artist"),
          ]);

        const [streamsData, listeningTimeData, timePerArtistData] =
          await Promise.all([
            streamsRes.json(),
            listeningTimeRes.json(),
            timePerArtistRes.json(),
          ]);

        setData({
          totalStreams: streamsData.totalStreams,
          totalListeningTime: listeningTimeData.totalListeningTime,
          timePerArtist: timePerArtistData,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner message="Loading your profile..." />;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <ProfileHeader />
      <ProfileDetails />

      <section className="mt-12 space-y-4">
        <div className="flex justify-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Listening Insights
          </h3>
        </div>
        <p className="text-gray-400 text-center">
          Data gathered from the past 4 weeks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TotalStreams data={data.totalStreams} />
          <TotalListeningTime data={data.totalListeningTime} />
          <TimePerArtist timePerArtist={data.timePerArtist} />
        </div>
      </section>
    </div>
  );
}
