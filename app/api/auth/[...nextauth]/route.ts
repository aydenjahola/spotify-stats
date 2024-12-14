/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-top-read",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account }: { token: any; account?: any }) {
      // If account exists, store the access token and other information in the JWT
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000; // Store expiration time
      }

      // If the token is expired, refresh it (optional)
      if (token.expiresAt && Date.now() > token.expiresAt) {
        // Optionally, you can refresh the token here using the refresh_token
        // For now, we're just passing the existing token.
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      // Include the accessToken and refreshToken in the session
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
