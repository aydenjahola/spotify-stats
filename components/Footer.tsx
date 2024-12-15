export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm sm:text-base text-center sm:text-left">
          &copy; {new Date().getFullYear()} Spotify Stats. All rights reserved.
        </p>

        <div className="mt-4 sm:mt-0 space-x-4 flex justify-center sm:justify-end">
          <a
            href="/privacy"
            className="text-sm sm:text-base hover:text-teal-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm sm:text-base hover:text-teal-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
