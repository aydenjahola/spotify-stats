import { fetchSpotifyData } from "./helpers";

export async function getArtistAlbums(artistId: string, accessToken: string) {
  const albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  const albumsData = await fetchSpotifyData(albumsUrl, accessToken);
  return albumsData.items;
}
