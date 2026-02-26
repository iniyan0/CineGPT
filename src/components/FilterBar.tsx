"use client";
import { Filters } from "@/lib/types";

const GENRES = ["Feel-good", "Dark & Intense", "Romance", "Thriller", "Sci-fi", "Animation", "Documentary", "Action", "Horror"];
const LANGUAGES = ["English", "Korean", "Japanese", "French", "Hindi", "Tamil", "Spanish", "Italian", "Chinese", "Arabic", "Persian", "Turkish", "German"];

interface FilterBarProps {
  filters: Filters;
  onToggleGenre: (g: string) => void;
  onToggleLang: (l: string) => void;
  onLangPref: (l: string) => void;
}

export default function FilterBar({ filters, onToggleGenre, onToggleLang, onLangPref }: FilterBarProps) {
  return (
    <div
      className="relative z-40 flex items-center gap-2 flex-shrink-0 overflow-x-auto"
      style={{
        padding: "8px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,14,0.78)",
        backdropFilter: "blur(18px)",
        scrollbarWidth: "none",
      }}
    >
      <span style={{ fontSize: "0.6rem", color: "#3e424e", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", flexShrink: 0 }}>Mood</span>
      {GENRES.map((g) => (
        <button
          key={g}
          onClick={() => onToggleGenre(g)}
          className={filters.genres.has(g) ? "chip-active" : ""}
          style={{
            padding: "3px 11px", borderRadius: 20,
            background: filters.genres.has(g) ? "rgba(240,200,74,0.1)" : "transparent",
            border: `1px solid ${filters.genres.has(g) ? "rgba(240,200,74,0.45)" : "rgba(255,255,255,0.07)"}`,
            color: filters.genres.has(g) ? "#f0c84a" : "#8b909c",
            fontSize: "0.68rem", fontFamily: "inherit", fontWeight: filters.genres.has(g) ? 500 : 400,
            cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.15s ease",
          }}
        >
          {g}
        </button>
      ))}

      <div style={{ width: 1, height: 13, background: "rgba(255,255,255,0.07)", flexShrink: 0, margin: "0 5px" }} />

      <span style={{ fontSize: "0.6rem", color: "#3e424e", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", flexShrink: 0 }}>Language</span>
      {LANGUAGES.map((l) => (
        <button
          key={l}
          onClick={() => onToggleLang(l)}
          style={{
            padding: "3px 11px", borderRadius: 20,
            background: filters.languages.has(l) ? "rgba(240,200,74,0.1)" : "transparent",
            border: `1px solid ${filters.languages.has(l) ? "rgba(240,200,74,0.45)" : "rgba(255,255,255,0.07)"}`,
            color: filters.languages.has(l) ? "#f0c84a" : "#8b909c",
            fontSize: "0.68rem", fontFamily: "inherit", fontWeight: filters.languages.has(l) ? 500 : 400,
            cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.15s ease",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
