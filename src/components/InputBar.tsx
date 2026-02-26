"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface InputBarProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  langPref: string;
  onLangPrefChange: (lang: string) => void;
}

const LANGUAGES = ["English", "Korean", "Japanese", "French", "Hindi", "Tamil", "Spanish", "Italian", "Chinese", "Arabic", "Persian", "Turkish", "German", "Portuguese"];

export default function InputBar({ onSend, isLoading, langPref, onLangPrefChange }: InputBarProps) {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setVoiceSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window);
  }, []);

  const grow = () => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = Math.min(taRef.current.scrollHeight, 110) + "px";
  };

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText("");
    if (taRef.current) taRef.current.style.height = "auto";
  }, [text, isLoading, onSend]);

  const stopVoice = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch (_) {}
    setListening(false);
  }, []);

  const toggleVoice = () => {
    if (!voiceSupported) { alert("Voice search is not supported in this browser. Try Chrome or Edge."); return; }
    if (listening) { stopVoice(); return; }

    const SR = (window as Window & typeof globalThis & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
               (window as Window & typeof globalThis & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        e.results[i].isFinal ? (final += t) : (interim += t);
      }
      setText(final || interim);
      if (taRef.current) { taRef.current.value = final || interim; grow(); }
      if (final) stopVoice();
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      console.error("Speech error:", e.error);
      stopVoice();
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div
      className="relative z-40 flex-shrink-0"
      style={{
        padding: "13px 28px 18px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,14,0.92)",
        backdropFilter: "blur(28px)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Input box */}
        <div
          className="input-ring flex items-end gap-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.13)",
            borderRadius: 12,
            padding: "9px 9px 9px 16px",
            transition: "border-color 0.2s",
          }}
        >
          <textarea
            ref={taRef}
            rows={1}
            value={text}
            placeholder={listening ? "Listening…" : "Ask about any movie, mood, genre or language…"}
            onChange={(e) => { setText(e.target.value); grow(); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#edeae3", fontFamily: "inherit", fontSize: "0.875rem",
              fontWeight: 300, resize: "none", maxHeight: 110, lineHeight: 1.55,
              scrollbarWidth: "none",
            }}
          />

          {/* Voice button */}
          {voiceSupported && (
            <button
              onClick={toggleVoice}
              title={listening ? "Stop listening" : "Voice search"}
              className={listening ? "voice-listening" : ""}
              style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#8b909c", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 10a7 7 0 0014 0M12 19v3M9 22h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={isLoading || !text.trim()}
            style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: isLoading || !text.trim()
                ? "rgba(255,255,255,0.08)"
                : "linear-gradient(135deg,#f0c84a,#e07845)",
              border: "none", cursor: isLoading || !text.trim() ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: isLoading || !text.trim() ? "#3e424e" : "#080a0e",
              transition: "all 0.2s",
              opacity: isLoading || !text.trim() ? 0.4 : 1,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Footer row */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4">
            <span style={{ fontSize: "0.63rem", color: "#3e424e" }}>
              Enter to send · Shift+Enter new line
            </span>
            {listening && (
              <span style={{ fontSize: "0.63rem", color: "#f05050", display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#f05050",
                    animation: "blink-r 0.8s ease infinite",
                    display: "inline-block",
                  }}
                />
                Listening…
              </span>
            )}
          </div>
          <select
            value={langPref}
            onChange={(e) => onLangPrefChange(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              color: "#8b909c", fontSize: "0.67rem", fontFamily: "inherit",
              padding: "4px 9px", borderRadius: 7, outline: "none", cursor: "pointer",
            }}
          >
            <option value="">Any language</option>
            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
