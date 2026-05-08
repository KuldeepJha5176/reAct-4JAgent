"use client";

import { useChat } from "@/hooks/useChat";
import { TopBar } from "@/components/layout/TopBar";
import { ChatSidebar } from "@/components/agent/ChatSidebar";
import { ChatMessages } from "@/components/agent/ChatMessages";
import { ChatInput } from "@/components/agent/ChatInput";
import { EmptyChat } from "@/components/agent/EmptyChat";

export default function AgentPage() {
  const {
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
  } = useChat();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="AI Agent" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[260px] flex-shrink-0 border-r border-apple-border overflow-hidden">
          <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onNew={newSession}
            onSelect={selectSession}
            onDelete={deleteSession}
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden bg-apple-bg">
          {activeSession && activeSession.messages.length > 0 ? (
            <ChatMessages
              messages={activeSession.messages}
              pendingMessage={pendingMessage}
              newMessageIds={newMessageIds}
            />
          ) : (
            <EmptyChat onPrompt={sendMessage} />
          )}
          <ChatInput
            onSend={sendMessage}
            disabled={pendingMessage}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      </div>
    </div>
  );
}
