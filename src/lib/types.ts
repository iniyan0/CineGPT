export interface Movie {
  title: string;
  originalTitle?: string;
  year: number;
  language: string;
  genre: string;
  emoji: string;
  reason: string;
  streaming: string[];
  posterUrl?: string | null;
}

export interface RecsResponse {
  type: "recs";
  intro: string;
  movies: Movie[];
  outro: string;
}

export interface ChatResponse {
  type: "chat";
  text: string;
}

export type AIResponse = RecsResponse | ChatResponse;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string | AIResponse;
  timestamp: Date;
}

export interface Filters {
  genres: string[];
  languages: string[];
  langPref: string;
}
