import { Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import { appendStorageItem, createId, storageKeys, type ToolOutput } from "../../utils/localStorage";

export function ConfidenceBuilder() {
  const [handled, setHandled] = useState("");
  const [tried, setTried] = useState("");
  const [challenge, setChallenge] = useState("");
  const [output, setOutput] = useState<ToolOutput | null>(null);

  function buildProof() {
    const content = [
      `One thing I handled recently: ${handled || "I handled something difficult and kept going."}`,
      `One thing I'm proud I tried: ${tried || "I tried even when it was not perfect."}`,
      `One small challenge I can do today: ${challenge || "Do the thing for 10 honest minutes."}`,
      "",
      "Your confidence proof: You have handled hard things before.",
      "Today's small courage move: Do the thing for 10 minutes, not perfectly, just honestly."
    ].join("\n");
    const saved = {
      id: createId(),
      date: new Date().toISOString(),
      tool: "confidence",
      title: "Confidence Builder",
      summary: "You have handled hard things before.",
      content
    };

    appendStorageItem<ToolOutput>(storageKeys.toolOutputs, saved);
    setOutput(saved);
  }

  return (
    <section className="app-screen tool-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Confidence Builder</p>
        <h1>Build proof.</h1>
        <p>Confidence is built through evidence and small action.</p>
      </div>

      <SupportBanner compact />

      <Card>
        <label className="field-label" htmlFor="handled">
          One thing I handled recently
        </label>
        <input id="handled" value={handled} onChange={(event) => setHandled(event.target.value)} />
        <label className="field-label" htmlFor="tried">
          One thing I'm proud I tried
        </label>
        <input id="tried" value={tried} onChange={(event) => setTried(event.target.value)} />
        <label className="field-label" htmlFor="challenge">
          One small challenge I can do today
        </label>
        <input id="challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} />
        <Button onClick={buildProof}>
          <Trophy aria-hidden="true" size={17} />
          Build Proof
        </Button>
      </Card>

      {output && (
        <Card tone="gold" className="tool-output">
          <h2>Your confidence proof</h2>
          <p>You have handled hard things before.</p>
          <h3>Today's small courage move</h3>
          <p>Do the thing for 10 minutes, not perfectly, just honestly.</p>
          <span>Saved to your demo journal on this device.</span>
        </Card>
      )}
    </section>
  );
}
