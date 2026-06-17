import type { Metadata } from "next";
import "./globals.css";
import AudioManager from "./AudioManager";

export const metadata: Metadata = {
  title: "Pensieve · อ่างแห่งความทรงจำ",
  description: "นิทรรศการภาพถ่าย Pensieve อ่างแห่งความทรงจำ — Photo Club",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AudioManager />
        {children}
      </body>
    </html>
  );
}
