import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileDetails from "@/components/Profile/ProfileDetails";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Profile Details */}
      <ProfileDetails />
    </div>
  );
}
