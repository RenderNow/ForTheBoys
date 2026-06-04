import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { ChatBubble } from "../../components/ChatBubble";
import { SupportBanner } from "../../components/SupportBanner";
import { mentorPromptCards } from "../../data/mentorResponses";
import { getMockMentorResponse } from "../../utils/mockMentor";
import { createId } from "../../utils/localStorage";

type Message = {
  id: string;
  from: "mentor" | "user" | "safety";
  text: string;
};

const openingMessage: Message = {
  id: "opening",
  from: "mentor",
  text: "I'm here to help you slow things down and choose the next right step. What do you want to work through?"
};

export function Mentor() {
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [draft, setDraft] = useState("");

  function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const result = getMockMentorResponse(trimmed);
    setMessages((current) => [
      ...current,
      { id: createId(), from: "user", text: trimmed },
      { id: createId(), from: result.type === "safety" ? "safety" : "mentor", text: result.response }
    ]);
    setDraft("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  return (
    <section className="app-screen mentor-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Mock mentor</p>
        <h1>Talk it through.</h1>
        <p>Canned responses only. No real AI is connected in this prototype.</p>
      </div>

      <SupportBanner compact />

      <div className="prompt-row" aria-label="Example mentor prompts">
        {mentorPromptCards.map((prompt) => (
          <button key={prompt} type="button" onClick={() => sendMessage(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-window" aria-live="polite">
        {messages.map((message) => (
          <ChatBubble key={message.id} from={message.from}>
            <p>{message.text}</p>
            {message.from === "safety" && (
              <Button to="/app/support" variant="secondary">
                Open Support
              </Button>
            )}
          </ChatBubble>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          aria-label="Message the mock mentor"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type what happened..."
        />
        <button type="submit" aria-label="Send message">
          <Send aria-hidden="true" size={18} />
        </button>
      </form>
    </section>
  );
}
