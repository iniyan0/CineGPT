import Image from "next/image";
import { Movie } from "@/lib/types";

const STREAM_STYLES: Record<string, { bg: string; color: string; border?: string }> = {
  Netflix:  { bg: "rgba(229,9,20,0.88)",   color: "#fff" },
  Prime:    { bg: "rgba(0,168,224,0.88)",  color: "#fff" },
  Hulu:     { bg: "rgba(28,231,131,0.88)", color: "#000" },
  "Disney+":{ bg: "rgba(17,60,207,0.88)",  color: "#fff" },
  MUBI:     { bg: "rgba(8,8,8,0.92)",      color: "#fff", border: "1px solid rgba(255,255,255,0.2)" },
  HBO:      { bg: "rgba(108,63,192,0.88)", color: "#fff" },
  Apple:    { bg: "rgba(28,28,28,0.92)",   color: "#fff" },
  Theater:  { bg: "rgba(201,118,62,0.88)", color: "#fff" },
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div
      className="movie-card rounded-xl overflow-hidden cursor-pointer"
      style={{ background: "rgba(16,19,26,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Poster */}
      <div className="relative w-full" style={{ paddingTop: "150%", background: "linear-gradient(155deg, #111520, #0c0e14)" }}>
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 45vw, 160px"
            className="poster-img object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ color: "#3e424e" }}>
            <span style={{ fontSize: "2rem" }}>{movie.emoji}</span>
            <span style={{ fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>No poster</span>
          </div>
        )}

        {/* Streaming badges */}
        {movie.streaming?.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {movie.streaming.slice(0, 2).map((s) => {
              const style = STREAM_STYLES[s] || { bg: "rgba(50,50,50,0.9)", color: "#fff" };
              return (
                <span
                  key={s}
                  style={{
                    fontSize: "0.5rem", fontWeight: 600,
                    padding: "2px 5px", borderRadius: 3,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    backdropFilter: "blur(6px)", lineHeight: 1.4,
                    background: style.bg, color: style.color,
                    border: style.border,
                  }}
                >
                  {s}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "9px 10px 10px" }}>
        <div
          style={{
            display: "inline-block", fontSize: "0.57rem", fontWeight: 500,
            padding: "1px 7px", borderRadius: 20,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
            color: "#8b909c", marginBottom: 5, letterSpacing: "0.04em",
          }}
        >
          {movie.language}
        </div>
        <div
          style={{
            fontSize: "0.8rem", fontWeight: 600, color: "#edeae3",
            lineHeight: 1.25, marginBottom: 1,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}
        >
          {movie.title}
        </div>
        <div style={{ fontSize: "0.63rem", color: "#3e424e", margin: "3px 0 4px" }}>
          {movie.year} · {movie.genre}
        </div>
        <div
          style={{
            fontSize: "0.65rem", color: "#8b909c", lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {movie.reason}
        </div>
      </div>
    </div>
  );
}
