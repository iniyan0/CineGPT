const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE  = "https://image.tmdb.org/t/p/w342";

export async function fetchPoster(title: string, year?: number): Promise<string | null> {
  const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!key || key === "your_tmdb_api_key_here") return null;

  try {
    const q = encodeURIComponent(title);

    // First try: with year
    if (year) {
      const res = await fetch(
        `${TMDB_BASE}/search/movie?api_key=${key}&query=${q}&year=${year}&include_adult=false&language=en-US`,
        { next: { revalidate: 86400 } } // cache 24h
      );
      if (res.ok) {
        const data = await res.json();
        const hit = data.results?.find((r: { poster_path?: string }) => r.poster_path);
        if (hit?.poster_path) return IMG_BASE + hit.poster_path;
      }
    }

    // Second try: without year
    const res2 = await fetch(
      `${TMDB_BASE}/search/movie?api_key=${key}&query=${q}&include_adult=false&language=en-US`,
      { next: { revalidate: 86400 } }
    );
    if (!res2.ok) return null;
    const data2 = await res2.json();
    const hit2 = data2.results?.find((r: { poster_path?: string }) => r.poster_path);
    return hit2?.poster_path ? IMG_BASE + hit2.poster_path : null;

  } catch (err) {
    console.warn("TMDB error for:", title, err);
    return null;
  }
}
