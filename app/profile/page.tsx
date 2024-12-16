import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import TotalStreams from "@/components/Profile/TotalStreams";
import TotalListeningTime from "@/components/Profile/TotalListeningTime";
import TimePerArtist from "@/components/Profile/TimePerArtist";

export default function ProfilePage() {
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
          <TotalStreams />
          <TotalListeningTime />
          <TimePerArtist />
        </div>
      </section>
    </div>
  );
}
