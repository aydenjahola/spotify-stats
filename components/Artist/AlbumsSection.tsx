/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";

interface AlbumsSectionProps {
  albums: any[];
}

export default function AlbumsSection({ albums }: AlbumsSectionProps) {
  return (
    <section className="space-y-8 w-full px-4 sm:px-8">
      <span className="text-3xl sm:text-3xl font-bold text-center sm:text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Albums
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/albums/${album.id}`}
            className="block bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 p-4"
          >
            <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden">
              <Image
                src={album.images[0]?.url || "/default-image.jpg"}
                alt={album.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white truncate">
                {album.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                Released: {album.release_date}
              </p>
              <p className="text-sm text-gray-400">
                Tracks: {album.total_tracks}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
