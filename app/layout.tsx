import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Coding 101 - Learn Cursor with Natural Language",
  description: "Get started with Cursor using natural language prompts. No coding experience needed - let Cursor write the code for you!",
  icons: {
    icon: "/fire-fireball.gif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
