/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/20/solid";
import SpotifyArtistCard from "./SpotifyArtistCard";
import SpotifyTrackCard from "./SpotifyTrackCard";
import SpotifyGenresCard from "./SpotifyGenresCard";

interface SpotifySectionProps {
  title: string;
  items?: any[];
  type?: string;
}

export default function SpotifySection({
  title,
  items = [],
  type = "artist",
}: SpotifySectionProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current && scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current && scrollIndex < items.length - 1) {
      setScrollIndex(scrollIndex + 1);
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 300,
        behavior: "smooth",
      });
    }
  };

  const toggleGridView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <section className="mt-12 relative">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          {title}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleGridView}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 hidden md:block lg:block xl:block"
          >
            {isGridView ? (
              <ArrowsPointingInIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <button
            onClick={handleScrollLeft}
            disabled={scrollIndex === 0}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleScrollRight}
            disabled={scrollIndex === items.length - 1}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="relative">
          {isGridView ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
              {items.slice(0, 50).map((item: any, index: number) => (
                <div key={item.id || `item-${index}`} className="flex-shrink-0">
                  {type === "artist" ? (
                    <SpotifyArtistCard artist={{ ...item, index }} />
                  ) : type === "track" ? (
                    <SpotifyTrackCard track={{ ...item, index }} />
                  ) : (
                    <SpotifyGenresCard genre={item} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className={`overflow-x-hidden flex space-x-6 mt-4 pb-8 touch-scroll ${
                type === "track" ? "scroll-smooth" : ""
              }`}
            >
              {items.slice(0, 50).map((item: any, index: number) => (
                <div key={`${item.id}-${index}`} className="flex-shrink-0">
                  {type === "artist" ? (
                    <SpotifyArtistCard artist={{ ...item, index }} />
                  ) : type === "track" ? (
                    <SpotifyTrackCard track={{ ...item, index }} />
                  ) : (
                    <SpotifyGenresCard genre={item} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
