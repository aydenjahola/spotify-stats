import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    followers: { total: number };
    country: string;
    product: string;
    external_urls: { spotify: string };
    playlists: {
      id: string;
      name: string;
      external_urls: { spotify: string };
    }[];
    totalPlaylists: number;
  }

  interface Session {
    user: User;
  }
}
