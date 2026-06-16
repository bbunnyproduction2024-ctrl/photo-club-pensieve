import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pensieve · อ่างแห่งความทรงจำ",
  description: "นิทรรศการภาพถ่าย Pensieve อ่างแห่งความทรงจำ — Photo Club",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
