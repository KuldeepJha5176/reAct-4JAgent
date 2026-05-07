"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary:
    "bg-apple-accent text-white hover:bg-[#0077ed] focus-visible:ring-apple-accent/40",
  ghost:
    "bg-transparent text-apple-text hover:bg-apple-fill3 focus-visible:ring-apple-accent/40",
  danger:
    "bg-apple-danger text-white hover:bg-[#cc0000] focus-visible:ring-apple-danger/40",
};

const sizes = {
  sm: "h-8 px-3 text-[13px] rounded-[7px]",
  md: "h-10 px-4 text-[15px] rounded-input",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  leftIcon,
  onClick,
  type = "button",
  children,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className={cn(
        "inline-flex items-center gap-2 font-medium cursor-pointer select-none",
        "transition-colors duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-1",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading ? (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
    </motion.button>
  );
}
