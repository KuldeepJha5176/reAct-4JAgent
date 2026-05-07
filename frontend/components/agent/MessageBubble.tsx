"use client";

import { motion } from "framer-motion";
import { Robot } from "@phosphor-icons/react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "ai";
  content: string;
  isNew?: boolean;
  isThinking?: boolean;
  onTypingDone?: () => void;
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="thinking-dot size-2 rounded-full bg-apple-secondary" />
      <span className="thinking-dot size-2 rounded-full bg-apple-secondary" />
      <span className="thinking-dot size-2 rounded-full bg-apple-secondary" />
    </div>
  );
}

function AiMessage({
  content,
  isNew,
  isThinking,
}: {
  content: string;
  isNew?: boolean;
  isThinking?: boolean;
}) {
  const displayed = useTypewriter(isNew ? content : "", 14);
  const text = isNew ? displayed : content;

  return (
    <div className="flex items-start gap-3 max-w-[70%]">
      <div className="flex-shrink-0 flex size-8 items-center justify-center rounded-full bg-apple-fill3 border border-apple-border mt-0.5">
        <Robot size={16} weight="bold" className="text-apple-secondary" />
      </div>
      <div className="rounded-[18px] rounded-tl-[4px] bg-apple-card border border-apple-border px-4 py-2.5 text-[15px] text-apple-text leading-relaxed whitespace-pre-wrap">
        {isThinking ? <ThinkingDots /> : text}
      </div>
    </div>
  );
}

export function MessageBubble({
  role,
  content,
  isNew,
  isThinking,
}: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={cn(
        "flex",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {role === "user" ? (
        <div
          className={cn(
            "max-w-[70%] rounded-[18px] rounded-tr-[4px]",
            "bg-apple-accent text-white px-4 py-2.5",
            "text-[15px] leading-relaxed whitespace-pre-wrap"
          )}
        >
          {content}
        </div>
      ) : (
        <AiMessage content={content} isNew={isNew} isThinking={isThinking} />
      )}
    </motion.div>
  );
}
