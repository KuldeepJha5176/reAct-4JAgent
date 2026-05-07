"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ChatCircleDots } from "@phosphor-icons/react";
import { ChatSession } from "@/types";
import { cn, formatRelativeTime } from "@/lib/utils";

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onNew,
  onSelect,
  onDelete,
}: ChatSidebarProps) {
  return (
    <aside className="flex flex-col bg-apple-fill2 h-full overflow-hidden">
      <div className="p-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          onClick={onNew}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5",
            "text-[14px] font-medium text-apple-secondary",
            "border border-apple-border bg-apple-card",
            "hover:border-apple-accent/30 hover:text-apple-accent transition-colors duration-150"
          )}
        >
          <Plus size={15} weight="bold" />
          New conversation
        </motion.button>
      </div>

      <div className="px-3 pb-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-apple-tertiary px-1">
          Recent
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 flex flex-col gap-0.5">
        <AnimatePresence mode="popLayout">
          {sessions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 py-10 text-center"
            >
              <ChatCircleDots size={32} className="text-apple-tertiary" />
              <p className="text-[13px] text-apple-tertiary">No conversations yet</p>
            </motion.div>
          )}
          {sessions.map((session) => {
            const isActive = session.id === activeSessionId;
            return (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="group relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="chat-pill"
                    className="absolute inset-0 rounded-[8px] bg-apple-accent/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <button
                  onClick={() => onSelect(session.id)}
                  className={cn(
                    "relative w-full rounded-[8px] px-3 py-2.5 text-left",
                    "transition-colors duration-100",
                    !isActive && "hover:bg-apple-card"
                  )}
                >
                  <p
                    className={cn(
                      "text-[13px] font-medium truncate",
                      isActive ? "text-apple-accent" : "text-apple-text"
                    )}
                  >
                    {session.title}
                  </p>
                  <p className="text-[11px] text-apple-tertiary mt-0.5">
                    {formatRelativeTime(session.createdAt)}
                  </p>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(session.id);
                  }}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    "size-6 flex items-center justify-center rounded-full",
                    "text-apple-tertiary hover:bg-apple-fill4 hover:text-apple-secondary",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                  )}
                >
                  <X size={12} weight="bold" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </nav>
    </aside>
  );
}
