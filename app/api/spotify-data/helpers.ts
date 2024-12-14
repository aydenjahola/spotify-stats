export async function fetchSpotifyData(url: string, token: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Spotify API Error:", res.status, errorText);
    throw new Error("Spotify API Error");
  }

  return res.json();
}
