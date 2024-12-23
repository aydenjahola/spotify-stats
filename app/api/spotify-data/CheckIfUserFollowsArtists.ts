import { getSession } from "./auth";
import { fetchSpotifyData } from "./helpers";

export async function CheckIfUserFollowsArtists(artistIds: string[]) {
  const session = await getSession();
  const url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistIds.join(
    ","
  )}`;
  const data = await fetchSpotifyData(url, session.accessToken);
  return data;
}
