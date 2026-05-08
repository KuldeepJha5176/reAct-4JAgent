"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MODELS = [
  { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite" },
  { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite" },
  { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B (Groq)" },
  { id: "mixtral-8x7b-32768", label: "Mixtral 8x7B (Groq)" },
];

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ChatInput({ onSend, disabled, selectedModel, onModelChange }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxHeight = 6 * 28;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-apple-border bg-apple-card px-6 py-4">
      <div className="max-w-3xl mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-[12px] text-apple-secondary whitespace-nowrap">Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={disabled}
            className={cn(
              "text-[12px] rounded-[8px] border border-apple-border bg-apple-fill px-2.5 py-1",
              "text-apple-text outline-none cursor-pointer",
              "focus:border-apple-accent focus:ring-1 focus:ring-apple-accent/20",
              "transition-colors duration-150",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        <div
          className={cn(
            "flex items-end gap-3 rounded-[14px] border bg-apple-card px-4 py-3",
            "transition-all duration-150",
            disabled
              ? "border-apple-border opacity-60"
              : "border-apple-border focus-within:border-apple-accent focus-within:ring-2 focus-within:ring-apple-accent/20"
          )}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKey}
            disabled={disabled}
            placeholder="Ask anything about your students…"
            className={cn(
              "flex-1 resize-none bg-transparent text-[15px] text-apple-text",
              "placeholder:text-apple-tertiary outline-none",
              "leading-7 max-h-[168px] overflow-y-auto scrollbar-thin"
            )}
          />
          <motion.button
            whileTap={disabled ? undefined : { scale: 0.88 }}
            transition={{ type: "spring", stiffness: 600, damping: 28 }}
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className={cn(
              "flex-shrink-0 flex size-9 items-center justify-center rounded-[10px]",
              "transition-colors duration-150",
              value.trim() && !disabled
                ? "bg-apple-accent text-white hover:bg-[#0077ed]"
                : "bg-apple-fill3 text-apple-tertiary cursor-not-allowed"
            )}
          >
            <PaperPlaneTilt size={17} weight="fill" />
          </motion.button>
        </div>
        <p className="text-center text-[11px] text-apple-tertiary">
          Press Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
