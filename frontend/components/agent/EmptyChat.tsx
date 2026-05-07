"use client";

import { motion } from "framer-motion";
import { ChatCircleDots } from "@phosphor-icons/react";

const examplePrompts = [
  "Who has the highest marks?",
  "List all students in class 10A",
  "What is the average age of students?",
  "Who scored below 50?",
];

interface EmptyChatProps {
  onPrompt: (prompt: string) => void;
}

export function EmptyChat({ onPrompt }: EmptyChatProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-apple-fill3 border border-apple-border">
          <ChatCircleDots size={32} weight="duotone" className="text-apple-accent" />
        </div>
        <div>
          <h2 className="text-[20px] font-semibold text-apple-text tracking-tight">
            Ask anything about your students
          </h2>
          <p className="mt-1 text-[15px] text-apple-secondary">
            The AI agent can look up data, compare scores, and answer questions in natural language.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
        {examplePrompts.map((prompt, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={() => onPrompt(prompt)}
            className="rounded-[10px] border border-apple-border bg-apple-card px-4 py-3 text-left text-[14px] text-apple-secondary hover:border-apple-accent/30 hover:text-apple-text hover:bg-apple-fill3 transition-colors duration-150"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
