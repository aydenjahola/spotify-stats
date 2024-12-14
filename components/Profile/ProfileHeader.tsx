"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileHeader() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Image
          src={session.user?.image || "/default-avatar.jpg"} // Default avatar if no image
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{session.user?.name}</h2>
        <p className="text-lg text-gray-500">{session.user?.email}</p>
      </div>
    </div>
  );
}
