import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "CrudLang",
  description: "Student management with AI agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid grid-cols-[240px_1fr] h-[100dvh] overflow-hidden bg-apple-bg">
        <Sidebar />
        <div className="flex flex-col h-[100dvh] overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
