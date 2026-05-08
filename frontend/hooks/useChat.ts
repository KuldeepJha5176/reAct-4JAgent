"use client";

import { useState, useCallback, useEffect } from "react";
import { ChatSession, Message } from "@/types";
import { askAgent } from "@/lib/api/agent";
import { generateId, truncate } from "@/lib/utils";

const STORAGE_KEY = "crudlang_chat_sessions";
const DEFAULT_MODEL = "gemini-2.5-flash-lite";

function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: ChatSession[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {}
}

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState(false);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);

  useEffect(() => {
    const stored = loadSessions();
    setSessions(stored);
    if (stored.length > 0) setActiveSessionId(stored[0].id);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveSessions(sessions);
  }, [sessions, mounted]);

  const newSession = useCallback(() => {
    const session: ChatSession = {
      id: generateId(),
      title: "New conversation",
      messages: [],
      createdAt: Date.now(),
    };
    setSessions((prev) => [session, ...prev]);
    setActiveSessionId(session.id);
  }, []);

  const selectSession = useCallback((id: string) => {
    setActiveSessionId(id);
  }, []);

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => {
        const next = prev.filter((s) => s.id !== id);
        if (activeSessionId === id) {
          setActiveSessionId(next.length > 0 ? next[0].id : null);
        }
        return next;
      });
    },
    [activeSessionId]
  );

  const sendMessage = useCallback(
    async (question: string) => {
      if (!question.trim() || pendingMessage) return;

      let targetId = activeSessionId;

      if (!targetId) {
        const session: ChatSession = {
          id: generateId(),
          title: truncate(question, 40),
          messages: [],
          createdAt: Date.now(),
          modelId: selectedModel,
        };
        setSessions((prev) => [session, ...prev]);
        setActiveSessionId(session.id);
        targetId = session.id;
      }

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: question,
        timestamp: Date.now(),
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== targetId) return s;
          const isFirst = s.messages.length === 0;
          return {
            ...s,
            title: isFirst ? truncate(question, 40) : s.title,
            messages: [...s.messages, userMsg],
          };
        })
      );

      setPendingMessage(true);
      try {
        const { answer } = await askAgent(question, targetId, selectedModel);
        const aiMsg: Message = {
          id: generateId(),
          role: "ai",
          content: answer,
          timestamp: Date.now(),
        };
        setNewMessageIds((prev) => new Set(prev).add(aiMsg.id));
        setSessions((prev) =>
          prev.map((s) =>
            s.id === targetId
              ? { ...s, messages: [...s.messages, aiMsg] }
              : s
          )
        );
      } catch (e) {
        const errMsg: Message = {
          id: generateId(),
          role: "ai",
          content:
            e instanceof Error
              ? `Error: ${e.message}`
              : "Something went wrong. Please try again.",
          timestamp: Date.now(),
        };
        setSessions((prev) =>
          prev.map((s) =>
            s.id === targetId
              ? { ...s, messages: [...s.messages, errMsg] }
              : s
          )
        );
      } finally {
        setPendingMessage(false);
      }
    },
    [activeSessionId, pendingMessage, selectedModel]
  );

  const clearNewMessageId = useCallback((id: string) => {
    setNewMessageIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null;

  return {
    sessions,
    activeSession,
    activeSessionId,
    pendingMessage,
    newMessageIds,
    selectedModel,
    setSelectedModel,
    newSession,
    selectSession,
    deleteSession,
    sendMessage,
    clearNewMessageId,
  };
}
