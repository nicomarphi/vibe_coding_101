import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe coding 101 - Learn cursor with natural language",
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
      <head>
        <link
          rel="preload"
          href="/VVDSFifties-Variable.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`min-h-screen bg-background font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
