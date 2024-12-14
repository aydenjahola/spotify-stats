import { signOut as nextAuthSignOut } from "next-auth/react";

export default function SignOutButton() {
  function signOut(): void {
    nextAuthSignOut({
      callbackUrl: "/", // Redirect to the home page after sign out
    });
  }

  return (
    <button
      onClick={() => signOut()}
      className="mt-4 px-4 py-2 bg-red-500 rounded-lg"
    >
      Sign Out
    </button>
  );
}
