import { signOut as nextAuthSignOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => nextAuthSignOut({ callbackUrl: "/" })}
      className="mt-8 px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-md"
    >
      Sign Out
    </button>
  );
}
