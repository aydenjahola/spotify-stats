import { getSession } from "./auth";

export async function removeAlbum(albumId: string) {
  if (!albumId) {
    throw new Error("Album ID is required to remove an album.");
  }

  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("User session is invalid or unauthorized.");
  }

  const url = `https://api.spotify.com/v1/me/albums`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: [albumId],
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to remove album: ${errorMessage}`);
    }

    return { success: true, message: "Album removed successfully!" };
  } catch (error) {
    const e = error as Error;
    console.error(`Error in removeAlbum: ${e.message}`);
    throw new Error("An error occurred while removing the album.");
  }
}
