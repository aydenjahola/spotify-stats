"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-600"
          >
            Spotify Stats
          </Link>
        </div>

        {/* Links Section */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-lg hover:text-teal-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-lg hover:text-teal-300 transition-colors duration-300"
          >
            Dashboard
          </Link>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="relative">
              {/* Profile Picture as button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-full w-10 h-10 overflow-hidden border-2 border-gray-600 hover:border-teal-400 transition-all"
              >
                <Image
                  src={session.user?.image || "/default-avatar.jpg"}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
                  >
                    Settings
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-lg hover:text-teal-300 transition-colors duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
