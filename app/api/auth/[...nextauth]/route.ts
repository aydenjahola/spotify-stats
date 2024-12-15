/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-top-read user-read-email user-read-private user-read-recently-played",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: any;
      account?: any;
      profile?: any;
    }) {
      // If account exists, store the access token and other information in the JWT
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000; // Store expiration time

        // Store additional user info in the token (name, email, and image)
        token.name = profile?.display_name || null;
        token.email = profile?.email || null;
        token.image = profile?.images?.[0]?.url || null;
        token.id = profile?.id || null;
        token.followers = profile?.followers?.total || null;
        token.country = profile?.country || null;

        // Fetch product information (subscription plan)
        try {
          const res = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });

          if (res.ok) {
            const userData = await res.json();
            token.product = userData.product; // Store subscription type (e.g., premium, free)
          } else {
            console.error("Error fetching user data from Spotify");
          }
        } catch (error) {
          console.error("Error fetching product data from Spotify:", error);
        }

        // Fetch playlists
        try {
          const playlistsRes = await fetch(
            "https://api.spotify.com/v1/me/playlists",
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );

          if (playlistsRes.ok) {
            const playlistsData = await playlistsRes.json();
            token.playlists = playlistsData.items || [];
            token.totalPlaylists = playlistsData.total || 0; // Store the total number of playlists
          } else {
            console.error("Error fetching playlists from Spotify");
          }
        } catch (error) {
          console.error("Error fetching playlists data from Spotify:", error);
        }
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      // Include the accessToken, refreshToken, and additional user info in the session
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken;
      }

      // Add name, email, and image to the session object
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.id = token.id;
      session.user.followers = token.followers;
      session.user.country = token.country;
      session.user.product = token.product;
      session.user.playlists = token.playlists;
      session.user.totalPlaylists = token.totalPlaylists;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
