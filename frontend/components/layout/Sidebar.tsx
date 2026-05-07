"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Robot } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/agent", label: "AI Agent", icon: Robot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-[100dvh] w-60 flex-col border-r border-apple-border bg-apple-card">
      <div className="flex h-14 items-center px-5 border-b border-apple-border">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-[7px] bg-apple-accent">
            <GraduationCap size={16} weight="bold" color="white" />
          </div>
          <span className="text-[15px] font-semibold text-apple-text tracking-tight">
            CrudLang
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="relative">
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-[8px] bg-apple-accent/10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <motion.div
                whileHover={{ x: isActive ? 0 : 2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "relative flex items-center gap-3 rounded-[8px] px-3 py-2.5",
                  "text-[15px] font-medium transition-colors duration-150",
                  isActive
                    ? "text-apple-accent"
                    : "text-apple-secondary hover:bg-apple-fill3 hover:text-apple-text"
                )}
              >
                <Icon size={18} weight={isActive ? "bold" : "regular"} />
                {label}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-apple-border p-3">
        <ThemeToggle />
        <p className="mt-2 px-3 text-[11px] text-apple-tertiary">
          Powered by Gemini 2.5
        </p>
      </div>
    </aside>
  );
}
