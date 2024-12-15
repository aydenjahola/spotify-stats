export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <div className="mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm sm:text-base text-center ">
          All copyrighted content (i.e. album artwork) on Spotify Stats are
          owned by their respective owners. Data is provided by Spotify AB.
          Spotify Stats is in no way affiliated with Spotify AB.
        </p>

        <div className="mt-4 sm:mt-0 space-x-4 flex justify-center sm:justify-end">
          <a
            href="/profile"
            className="text-sm sm:text-base hover:text-teal-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Profile
          </a>
          <a
            href="/dashboard"
            className="text-sm sm:text-base hover:text-teal-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Dashboard
          </a>
        </div>
      </div>

      {/* Centered the footer text */}
      <div className="mt-8 text-center text-md text-gray-400">
        &copy; {new Date().getFullYear()} Made with
        <span className="text-red-500 animate-pulse mx-1">❤️</span>
        by{" "}
        <a
          href="https://github.com/aydenjahola/spotify-stats"
          className="font-medium text-teal-400 hover:text-teal-300 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ayden
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
}
