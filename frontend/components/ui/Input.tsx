"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-[13px] font-medium text-apple-secondary"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 w-full rounded-input border bg-apple-card px-3 text-[15px] text-apple-text",
            "outline-none transition-all duration-150",
            "placeholder:text-apple-tertiary",
            error
              ? "border-apple-danger focus:border-apple-danger focus:ring-2 focus:ring-apple-danger/20"
              : "border-apple-border focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[12px] text-apple-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
