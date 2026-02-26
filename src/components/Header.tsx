interface HeaderProps {
  filtersVisible: boolean;
  onToggleFilters: () => void;
}

export default function Header({ filtersVisible, onToggleFilters }: HeaderProps) {
  return (
    <header
      className="relative z-40 flex items-center justify-between flex-shrink-0"
      style={{
        padding: "13px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,14,0.92)",
        backdropFilter: "blur(28px)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center text-sm"
          style={{
            width: 30, height: 30, borderRadius: 7,
            background: "linear-gradient(135deg, #f0c84a, #e07845)",
            color: "#080a0e",
          }}
        >
          🎬
        </div>
        <div style={{ fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
          Cine<span style={{ color: "#f0c84a" }}>GPT</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2" style={{ fontSize: "0.67rem", color: "#8b909c", letterSpacing: "0.04em" }}>
          <div
            className="live-dot rounded-full"
            style={{ width: 6, height: 6, background: "#4ade80", boxShadow: "0 0 7px rgba(74,222,128,0.7)" }}
          />
          AI Online
        </div>
        <span style={{ fontSize: "0.67rem", color: "#3e424e" }}>All languages · All eras</span>
        <button
          onClick={onToggleFilters}
          style={{
            fontSize: "0.67rem", color: filtersVisible ? "#f0c84a" : "#8b909c",
            background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em",
          }}
        >
          {filtersVisible ? "Hide filters ↑" : "Filters ↓"}
        </button>
      </div>
    </header>
  );
}
