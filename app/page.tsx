import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold">Spotify Stats</h1>
      <p className="mt-4 text-lg text-gray-400">
        See your top artists, tracks, and more.
      </p>
      <Link
        href="/api/auth/signin"
        className="mt-8 px-6 py-3 bg-green-500 rounded-lg text-white hover:bg-green-600"
      >
        Sign In with Spotify
      </Link>
    </main>
  );
}
