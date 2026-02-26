"use client";

const SUGGESTIONS = [
  "Films similar to Parasite",
  "Best Korean thrillers",
  "French New Wave classics",
  "Cozy films for tonight",
  "Hidden gems from Japan",
  "Best animated films ever",
  "Must-watch Tamil films",
  "Underrated Iranian cinema",
];

interface WelcomeMessageProps {
  onSuggestion: (text: string) => void;
}

export default function WelcomeMessage({ onSuggestion }: WelcomeMessageProps) {
  return (
    <>
      <div className="flex gap-3 mb-5 animate-rise">
        <div
          className="flex items-center justify-center text-sm flex-shrink-0 mt-1"
          style={{ width: 31, height: 31, borderRadius: 8, background: "linear-gradient(135deg,#f0c84a,#e07845)", color: "#080a0e" }}
        >
          🎬
        </div>
        <div
          style={{
            background: "rgba(14,18,26,0.90)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "4px 12px 12px 12px", padding: "13px 17px",
            backdropFilter: "blur(10px)", fontSize: "0.865rem", lineHeight: 1.65, maxWidth: "82%",
          }}
        >
          <p style={{ marginBottom: 8 }}><strong>Hey, I&apos;m CineGPT.</strong> Your AI guide to world cinema.</p>
          <p style={{ marginBottom: 8 }}>
            Ask me for recommendations in <em>any language or mood</em> — I&apos;ll find the perfect film, complete with posters and where to watch.
          </p>
          <p style={{ color: "#8b909c", fontSize: "0.8rem" }}>
            Try: <em>&quot;Films like Parasite&quot;</em> · <em>&quot;Best Tamil thrillers&quot;</em> · <em>&quot;Cozy French films on Netflix&quot;</em>
          </p>
        </div>
      </div>

      {/* Suggestion chips */}
      <div style={{ marginLeft: 44, marginBottom: 22, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            style={{
              padding: "5px 13px", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "transparent", color: "#8b909c",
              fontSize: "0.71rem", fontFamily: "inherit",
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "rgba(240,200,74,0.38)";
              (e.target as HTMLButtonElement).style.color = "#f0c84a";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.target as HTMLButtonElement).style.color = "#8b909c";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </>
  );
}
