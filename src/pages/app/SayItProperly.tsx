import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import { appendStorageItem, createId, storageKeys, type ToolOutput } from "../../utils/localStorage";
import { detectSafetyKeyword } from "../../utils/safetyKeywords";

const rewriteOutputs: Record<string, string> = {
  "Make it calmer":
    "I was frustrated earlier, but I do not want to handle it badly. I need to be honest about how I felt, and I'm willing to talk properly when we're both calm.",
  "Make it more honest":
    "I need to be honest about this without turning it into an argument. What happened affected me, and I want to talk about it properly.",
  "Set a boundary":
    "I want to handle this respectfully, but I am not okay with being spoken to like that. I am willing to talk when it stays calm.",
  "Apologise properly":
    "I handled that badly. I am sorry for my part in it. I do not want to make excuses, and I want to do better next time.",
  "Ask a trusted adult":
    "I need some help with a situation. I am not sure how to handle it safely on my own. Can I explain what happened?"
};

export function SayItProperly() {
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState("Make it calmer");
  const [output, setOutput] = useState<ToolOutput | null>(null);

  function rewrite(selectedMode = mode) {
    setMode(selectedMode);
    const isSerious = detectSafetyKeyword(draft);
    const content = isSerious
      ? "This sounds serious and bigger than a rewrite tool. If you or someone else might be in immediate danger, contact emergency services now or speak to a trusted adult nearby."
      : rewriteOutputs[selectedMode];
    const saved = {
      id: createId(),
      date: new Date().toISOString(),
      tool: "say-it-properly",
      title: "Say It Properly",
      summary: selectedMode,
      content
    };

    appendStorageItem<ToolOutput>(storageKeys.toolOutputs, saved);
    setOutput(saved);
  }

  return (
    <section className="app-screen tool-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Say It Properly</p>
        <h1>Clear, not cruel.</h1>
        <p>Rewrite rough communication into something calmer, clearer and stronger.</p>
      </div>

      <SupportBanner compact />

      <Card>
        <label className="field-label" htmlFor="rough-message">
          Rough version
        </label>
        <textarea
          id="rough-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Paste the message you want to send, or write the rough version here."
        />
        <div className="mode-grid">
          {Object.keys(rewriteOutputs).map((item) => (
            <button
              key={item}
              className={mode === item ? "selected" : ""}
              type="button"
              onClick={() => rewrite(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </Card>

      <Card tone="danger" className="rule-card">
        <h2>Hard rule</h2>
        <p>Do not generate threats, manipulation, harassment, coercion, sexual pressure or harmful messages.</p>
      </Card>

      {output && (
        <Card tone="gold" className="tool-output">
          <h2>{output.summary}</h2>
          <p>{output.content}</p>
          <Button variant="secondary" onClick={() => rewrite(mode)}>
            <MessageCircle aria-hidden="true" size={17} />
            Save Another
          </Button>
        </Card>
      )}
    </section>
  );
}
