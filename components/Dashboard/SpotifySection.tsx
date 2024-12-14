/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef } from "react";
import SpotifyArtistCard from "./SpotifyArtistCard";
import SpotifyTrackCard from "./SpotifyTrackCard";

interface SpotifySectionProps {
  title: string;
  items?: any[]; // Mark as optional to avoid undefined issues
  type?: string; // Add type property to differentiate artist and track
}

export default function SpotifySection({
  title,
  items = [],
  type = "artist",
}: SpotifySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-12 relative">
      <h2 className="text-4xl font-semibold mb-6">{title}</h2>
      {items.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="relative">
          {/* Navigation Buttons with DaisyUI Styling */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 btn btn-circle btn-primary shadow-lg"
            aria-label="Scroll Left"
          >
            <span className="text-xl">←</span>
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 btn btn-circle btn-primary shadow-lg"
            aria-label="Scroll Right"
          >
            <span className="text-xl">→</span>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className={`overflow-x-hidden flex space-x-6 mt-4 pb-8 ${
              type === "track" ? "scroll-smooth" : ""
            }`}
          >
            {items.slice(0, 5).map((item: any) => (
              <div key={item.id} className="flex-shrink-0">
                {type === "artist" ? (
                  <SpotifyArtistCard artist={item} />
                ) : (
                  <SpotifyTrackCard track={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
