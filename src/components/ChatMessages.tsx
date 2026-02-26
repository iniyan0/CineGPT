"use client";
import { useEffect, useRef } from "react";
import { Message, RecsResponse } from "@/lib/types";
import MovieCard from "./MovieCard";

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-5 animate-rise">
      <div className="flex items-center justify-center text-sm flex-shrink-0 mt-1"
        style={{ width:31,height:31,borderRadius:8,background:"linear-gradient(135deg,#f0c84a,#e07845)",color:"#080a0e" }}>
        🎬
      </div>
      <div style={{ background:"rgba(14,18,26,0.90)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"4px 12px 12px 12px",padding:"13px 17px",backdropFilter:"blur(10px)" }}>
        <div className="flex gap-2 items-center py-1">
          <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
        </div>
      </div>
    </div>
  );
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) return null;

  return (
    <>
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-3 mb-5 animate-rise ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
          <div className="flex items-center justify-center flex-shrink-0 mt-1"
            style={{
              width:31,height:31,borderRadius:8,
              background: msg.role==="assistant" ? "linear-gradient(135deg,#f0c84a,#e07845)" : "rgba(255,255,255,0.05)",
              border: msg.role==="user" ? "1px solid rgba(255,255,255,0.13)" : "none",
              color: msg.role==="assistant" ? "#080a0e" : "#8b909c",
              fontSize: msg.role==="assistant" ? 14 : 10, fontWeight:500,
            }}>
            {msg.role==="assistant" ? "🎬" : "You"}
          </div>

          {msg.role === "user" ? (
            <div style={{ background:"rgba(240,200,74,0.07)",border:"1px solid rgba(240,200,74,0.14)",borderRadius:"12px 4px 12px 12px",padding:"11px 15px",maxWidth:"60%",fontSize:"0.865rem",lineHeight:1.65 }}>
              {typeof msg.content === "string" ? msg.content : ""}
            </div>
          ) : (
            <div style={{
              background:"rgba(14,18,26,0.90)",border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:"4px 12px 12px 12px",padding:"13px 17px",backdropFilter:"blur(10px)",
              fontSize:"0.865rem",lineHeight:1.65,
              maxWidth: typeof msg.content==="object" && (msg.content as RecsResponse).type==="recs" ? "100%" : "82%",
              width: typeof msg.content==="object" && (msg.content as RecsResponse).type==="recs" ? "100%" : undefined,
            }}>
              {typeof msg.content === "string" ? (
                <p>{msg.content}</p>
              ) : msg.content && typeof msg.content === "object" ? (
                (msg.content as RecsResponse).type === "recs" ? (
                  <>
                    <p style={{ fontSize:"0.84rem",color:"#8b909c",marginBottom:14 }}>{(msg.content as RecsResponse).intro}</p>
                    <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:11,marginBottom:13 }}>
                      {(msg.content as RecsResponse).movies.map((movie,i) => <MovieCard key={i} movie={movie}/>)}
                    </div>
                    {(msg.content as RecsResponse).outro && (
                      <div style={{ marginTop:4,paddingTop:11,borderTop:"1px solid rgba(255,255,255,0.07)",fontSize:"0.77rem",color:"#8b909c",fontStyle:"italic" }}>
                        {(msg.content as RecsResponse).outro}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{(msg.content as { type:string; text:string }).text}</p>
                )
              ) : null}
            </div>
          )}
        </div>
      ))}
      {isLoading && <TypingIndicator/>}
      <div ref={bottomRef}/>
    </>
  );
}
