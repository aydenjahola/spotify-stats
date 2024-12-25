import { getSession } from "./auth";

export async function saveAlbum(albumId: string) {
  if (!albumId) {
    throw new Error("Album ID is required to save an album.");
  }

  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("User session is invalid or unauthorized.");
  }

  const url = `https://api.spotify.com/v1/me/albums?ids=${albumId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to save album: ${errorMessage}`);
    }

    return { success: true, message: "Album saved successfully!" };
  } catch (error) {
    const e = error as Error;
    console.error(`Error in saveAlbum: ${e.message}`);
    throw new Error("An error occurred while saving the album.");
  }
}
