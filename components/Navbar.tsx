"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Reference for the button

  // Close the dropdown when clicking outside of it or on an option
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
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
                ref={buttonRef} // Attach ref to button
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
                <div
                  ref={dropdownRef} // Attach ref to dropdown
                  className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 z-50"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
                    onClick={() => setDropdownOpen(false)} // Close dropdown on option click
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
                    onClick={() => setDropdownOpen(false)} // Close dropdown on option click
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded"
                    onClick={() => {
                      setDropdownOpen(false); // Close dropdown when signing out
                      signOut(); // Sign out the user
                    }}
                  >
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
