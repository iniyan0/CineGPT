import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineGPT — AI Movie Recommendations",
  description: "Your AI-powered guide to world cinema in every language",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Geist', system-ui, sans-serif", fontWeight: 300 }}>
        {children}
      </body>
    </html>
  );
}
