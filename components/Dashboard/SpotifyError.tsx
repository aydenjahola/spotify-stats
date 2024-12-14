interface SpotifyErrorProps {
  message: string;
}

export default function SpotifyError({ message }: SpotifyErrorProps) {
  return <p className="text-red-600 text-lg font-semibold">{message}</p>;
}
