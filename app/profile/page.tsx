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
      <section className="mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Listening Insights
        </h2>
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
