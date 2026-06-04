import { BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import { appendStorageItem, createId, storageKeys, type ToolOutput } from "../../utils/localStorage";

export function SelfWorthJournal() {
  const [harshThought, setHarshThought] = useState("");
  const [trigger, setTrigger] = useState("");
  const [honestVersion, setHonestVersion] = useState("");
  const [respectAction, setRespectAction] = useState("");
  const [output, setOutput] = useState<ToolOutput | null>(null);

  function saveJournal() {
    const honest = honestVersion || "I'm struggling today, but that does not make me useless. I can still take one useful step.";
    const content = [
      `Harsh thought: ${harshThought || "I'm useless."}`,
      `What triggered it: ${trigger || "A hard moment or comparison."}`,
      `More honest version: ${honest}`,
      `One action that respects me: ${respectAction || "Take one useful step without attacking myself."}`
    ].join("\n");
    const saved = {
      id: createId(),
      date: new Date().toISOString(),
      tool: "self-worth",
      title: "Self-Worth Journal",
      summary: honest,
      content
    };

    appendStorageItem<ToolOutput>(storageKeys.toolOutputs, saved);
    setOutput(saved);
  }

  return (
    <section className="app-screen tool-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Self-Worth Journal</p>
        <h1>Honest, not cruel.</h1>
        <p>Rewrite harsh self-talk with truth and one action that respects you.</p>
      </div>

      <SupportBanner compact />

      <Card>
        <label className="field-label" htmlFor="harsh-thought">
          Harsh thought
        </label>
        <input
          id="harsh-thought"
          value={harshThought}
          onChange={(event) => setHarshThought(event.target.value)}
          placeholder="I'm useless."
        />
        <label className="field-label" htmlFor="trigger">
          What triggered it?
        </label>
        <input id="trigger" value={trigger} onChange={(event) => setTrigger(event.target.value)} />
        <label className="field-label" htmlFor="honest-version">
          A more honest version
        </label>
        <textarea
          id="honest-version"
          value={honestVersion}
          onChange={(event) => setHonestVersion(event.target.value)}
          placeholder="I'm struggling today, but that does not make me useless. I can still take one useful step."
        />
        <label className="field-label" htmlFor="respect-action">
          One action that respects me
        </label>
        <input id="respect-action" value={respectAction} onChange={(event) => setRespectAction(event.target.value)} />
        <Button onClick={saveJournal}>
          <BookOpen aria-hidden="true" size={17} />
          Save Reflection
        </Button>
      </Card>

      {output && (
        <Card tone="gold" className="tool-output">
          <h2>More honest version</h2>
          <p>{output.summary}</p>
          <h3>One action that respects me</h3>
          <p>{respectAction || "Take one useful step without attacking myself."}</p>
        </Card>
      )}
    </section>
  );
}
