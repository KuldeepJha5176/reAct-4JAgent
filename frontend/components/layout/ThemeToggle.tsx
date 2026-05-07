"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (!mounted) return <div className="h-9 w-full" />;

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      onClick={toggle}
      className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-[14px] font-medium text-apple-secondary hover:bg-apple-fill3 hover:text-apple-text transition-colors duration-150"
      aria-label="Toggle dark mode"
    >
      <motion.div
        key={dark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {dark ? <Moon size={17} weight="bold" /> : <Sun size={17} weight="bold" />}
      </motion.div>
      {dark ? "Light mode" : "Dark mode"}
    </motion.button>
  );
}
