import type { ReactNode } from "react";

type ChatBubbleProps = {
  children: ReactNode;
  from?: "mentor" | "user" | "safety";
};

export function ChatBubble({ children, from = "mentor" }: ChatBubbleProps) {
  return <div className={`chat-bubble chat-${from}`}>{children}</div>;
}
