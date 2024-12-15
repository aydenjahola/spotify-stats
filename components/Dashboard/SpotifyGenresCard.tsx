interface SpotifyGenresCardProps {
  genre: string;
}

export default function SpotifyGenresCard({ genre }: SpotifyGenresCardProps) {
  return (
    <div className="p-4 rounded-lg shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-md font-bold text-white">{genre}</h3>
      </div>
      <div className="absolute inset-0 rounded-lg border-4 border-transparent animate-glowing-border"></div>
    </div>
  );
}
