declare module "albums" {
  interface Artist {
    id: string;
    name: string;
    external_urls: { spotify: string };
  }

  interface Track {
    id: string;
    name: string;
    duration_ms: number;
    explicit: boolean;
    artists: Artist[];
    external_urls: { spotify: string };
    imageUrl: string;
  }

  interface AlbumData {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    imageUrl: string;
    tracks: {
      items: Track[];
    } | null;
  }
}
