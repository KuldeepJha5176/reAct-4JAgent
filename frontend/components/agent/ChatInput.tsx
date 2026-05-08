"use client";

import { useRef, useState, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneTilt, CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MODELS = [
  { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite", short: "Gemini 2.5" },
  { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite", short: "Gemini 2.0" },
  { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B (Groq)", short: "Llama 3.3" },
];

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ChatInput({ onSend, disabled, selectedModel, onModelChange }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentModel = MODELS.find((m) => m.id === selectedModel) ?? MODELS[0];

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-apple-border bg-apple-card px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <div
          className={cn(
            "rounded-[18px] border bg-apple-card transition-all duration-150",
            disabled
              ? "border-apple-border opacity-60"
              : "border-apple-border focus-within:border-apple-accent focus-within:ring-2 focus-within:ring-apple-accent/20"
          )}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => { setValue(e.target.value); autoResize(); }}
            onKeyDown={handleKey}
            disabled={disabled}
            placeholder="Ask anything about your students…"
            className={cn(
              "w-full resize-none bg-transparent text-[15px] text-apple-text",
              "placeholder:text-apple-tertiary outline-none",
              "leading-7 max-h-[168px] overflow-y-auto scrollbar-thin",
              "px-4 pt-3.5 pb-2"
            )}
          />

          {/* Bottom action bar */}
          <div className="flex items-center justify-between px-3 pb-3">
            {/* Model picker pill */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => !disabled && setModelOpen((o) => !o)}
                disabled={disabled}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  "text-[12px] font-medium",
                  "bg-apple-fill border border-apple-border",
                  "text-apple-secondary hover:text-apple-text hover:bg-apple-fill3",
                  "transition-colors duration-150 select-none",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {currentModel.short}
                <CaretDown
                  size={10}
                  weight="bold"
                  className={cn("transition-transform duration-200", modelOpen && "rotate-180")}
                />
              </button>

              <AnimatePresence>
                {modelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={cn(
                      "absolute bottom-full mb-2 left-0 z-50 min-w-[200px]",
                      "bg-apple-card border border-apple-border rounded-[12px]",
                      "shadow-xl overflow-hidden"
                    )}
                  >
                    {MODELS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => { onModelChange(m.id); setModelOpen(false); }}
                        className={cn(
                          "w-full flex items-center justify-between px-3.5 py-2.5 text-left",
                          "text-[13px] transition-colors duration-100",
                          m.id === selectedModel
                            ? "text-apple-accent bg-apple-fill"
                            : "text-apple-text hover:bg-apple-fill"
                        )}
                      >
                        <span>{m.label}</span>
                        {m.id === selectedModel && (
                          <Check size={13} weight="bold" className="text-apple-accent flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Send button */}
            <motion.button
              whileTap={disabled ? undefined : { scale: 0.88 }}
              transition={{ type: "spring", stiffness: 600, damping: 28 }}
              onClick={handleSend}
              disabled={disabled || !value.trim()}
              className={cn(
                "flex size-8 items-center justify-center rounded-full flex-shrink-0",
                "transition-colors duration-150",
                value.trim() && !disabled
                  ? "bg-apple-accent text-white hover:bg-[#0077ed]"
                  : "bg-apple-fill3 text-apple-tertiary cursor-not-allowed"
              )}
            >
              <PaperPlaneTilt size={15} weight="fill" />
            </motion.button>
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] text-apple-tertiary">
          Press Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
