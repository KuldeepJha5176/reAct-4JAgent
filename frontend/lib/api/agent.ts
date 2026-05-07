import { apiFetch } from "./client";

export async function askAgent(
  question: string,
  sessionId: string
): Promise<{ answer: string }> {
  const res = await fetch("/api/agent/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, sessionId }),
  });

  const data = await res.json();

  // Backend returns { answer: "..." } even for error cases (429, 500)
  if (data?.answer) return data as { answer: string };

  throw new Error(`Agent error ${res.status}`);
}
