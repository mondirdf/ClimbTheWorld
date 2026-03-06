import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internet Mountain",
  description: "Scroll forever, plant flags, and climb the infinite web mountain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
