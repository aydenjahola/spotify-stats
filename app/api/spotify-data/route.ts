import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Make the request to the Spotify API to fetch user top artists
  try {
    const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Spotify API Error:", res.status, errorText);
      return new Response("Spotify API Error", { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return new Response("Error fetching Spotify data", { status: 500 });
  }
}
