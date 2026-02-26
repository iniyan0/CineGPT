"use client";
import { useState, useCallback } from "react";
import Background from "@/components/Background";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ChatMessages from "@/components/ChatMessages";
import InputBar from "@/components/InputBar";
import WelcomeMessage from "@/components/WelcomeMessage";
import { Message, Filters, AIResponse } from "@/lib/types";

function buildContext(filters: Filters): string {
  const parts: string[] = [];
  if (filters.genres.size) parts.push(`Mood: ${[...filters.genres].join(", ")}`);
  if (filters.languages.size) parts.push(`Language chips: ${[...filters.languages].join(", ")}`);
  if (filters.langPref) parts.push(`Language preference: ${filters.langPref}`);
  return parts.join(". ");
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    genres: new Set(),
    languages: new Set(),
    langPref: "",
  });

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowWelcome(false);
    setIsLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Build conversation history for Claude
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: typeof m.content === "string" ? m.content : JSON.stringify(m.content),
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          context: buildContext(filters),
        }),
      });

      const data: AIResponse = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: { type: "chat", text: "Something went wrong! Please try again." } as AIResponse,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, filters]);

  const toggleGenre = (g: string) =>
    setFilters((prev) => {
      const next = new Set(prev.genres);
      next.has(g) ? next.delete(g) : next.add(g);
      return { ...prev, genres: next };
    });

  const toggleLang = (l: string) =>
    setFilters((prev) => {
      const next = new Set(prev.languages);
      next.has(l) ? next.delete(l) : next.add(l);
      return { ...prev, languages: next };
    });

  return (
    <div className="flex flex-col" style={{ height: "100vh", overflow: "hidden" }}>
      <Background />

      <Header filtersVisible={showFilters} onToggleFilters={() => setShowFilters((v) => !v)} />

      {showFilters && (
        <FilterBar
          filters={filters}
          onToggleGenre={toggleGenre}
          onToggleLang={toggleLang}
          onLangPref={(l) => setFilters((prev) => ({ ...prev, langPref: l }))}
        />
      )}

      <div className="flex-1 overflow-y-auto relative z-10" style={{ padding: "26px 28px 14px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.05) transparent" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", fontSize: "0.58rem", color: "#3e424e", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20, opacity: 0.5 }}>
            Start of conversation
          </div>

          {showWelcome && <WelcomeMessage onSuggestion={(s) => { setShowWelcome(false); handleSend(s); }} />}

          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>
      </div>

      <InputBar
        onSend={handleSend}
        isLoading={isLoading}
        langPref={filters.langPref}
        onLangPrefChange={(l) => setFilters((prev) => ({ ...prev, langPref: l }))}
      />
    </div>
  );
}
