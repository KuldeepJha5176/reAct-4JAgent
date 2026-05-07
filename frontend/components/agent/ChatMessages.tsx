"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Message } from "@/types";
import { MessageBubble } from "./MessageBubble";

interface ChatMessagesProps {
  messages: Message[];
  pendingMessage: boolean;
  newMessageIds: Set<string>;
}

export function ChatMessages({
  messages,
  pendingMessage,
  newMessageIds,
}: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, pendingMessage]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isNew={newMessageIds.has(msg.id)}
            />
          ))}
          {pendingMessage && (
            <MessageBubble
              key="thinking"
              role="ai"
              content=""
              isThinking
            />
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
    </div>
  );
}
