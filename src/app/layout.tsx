import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AshrafAI - Next Generation AI Assistant",
  description: "Experience the future of AI conversation with AshrafAI. Powered by advanced language models for intelligent, contextual, and creative responses.",
  keywords: ["AI", "Chatbot", "AshrafAI", "Artificial Intelligence", "Chat Assistant"],
  authors: [{ name: "AshrafAI Team" }],
  openGraph: {
    title: "AshrafAI - Next Generation AI Assistant",
    description: "Experience the future of AI conversation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
