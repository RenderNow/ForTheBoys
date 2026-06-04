import { Compass } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import { appendStorageItem, createId, storageKeys, type ToolOutput } from "../../utils/localStorage";

export function PurposePlanner() {
  const [man, setMan] = useState("");
  const [matters, setMatters] = useState("");
  const [avoiding, setAvoiding] = useState("");
  const [weekStep, setWeekStep] = useState("");
  const [output, setOutput] = useState<ToolOutput | null>(null);

  function makePlan() {
    const content = [
      "Your next-right-step plan:",
      "",
      `Direction: ${man || "Become more reliable and disciplined."}`,
      `What matters right now: ${matters || "Protecting my character and future."}`,
      `Stop avoiding: ${avoiding || "One unfinished responsibility."}`,
      `This week: ${weekStep || "Finish one thing I have been avoiding."}`,
      "Today: Give it 20 focused minutes."
    ].join("\n");
    const saved = {
      id: createId(),
      date: new Date().toISOString(),
      tool: "purpose",
      title: "Purpose Planner",
      summary: "Finish one thing you have been avoiding.",
      content
    };

    appendStorageItem<ToolOutput>(storageKeys.toolOutputs, saved);
    setOutput(saved);
  }

  return (
    <section className="app-screen tool-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Purpose Planner</p>
        <h1>Find the next step.</h1>
        <p>You do not need your whole life solved to move properly today.</p>
      </div>

      <SupportBanner compact />

      <Card>
        <label className="field-label" htmlFor="man">
          What kind of man do you want to become?
        </label>
        <input id="man" value={man} onChange={(event) => setMan(event.target.value)} />
        <label className="field-label" htmlFor="matters">
          What matters to you right now?
        </label>
        <input id="matters" value={matters} onChange={(event) => setMatters(event.target.value)} />
        <label className="field-label" htmlFor="avoiding">
          What is one thing you need to stop avoiding?
        </label>
        <input id="avoiding" value={avoiding} onChange={(event) => setAvoiding(event.target.value)} />
        <label className="field-label" htmlFor="week-step">
          What is one next step you can take this week?
        </label>
        <input id="week-step" value={weekStep} onChange={(event) => setWeekStep(event.target.value)} />
        <Button onClick={makePlan}>
          <Compass aria-hidden="true" size={17} />
          Make Plan
        </Button>
      </Card>

      {output && (
        <Card tone="gold" className="tool-output">
          <h2>Your next-right-step plan</h2>
          <p>Direction: {man || "Become more reliable and disciplined."}</p>
          <p>This week: {weekStep || "Finish one thing you have been avoiding."}</p>
          <p>Today: Give it 20 focused minutes.</p>
        </Card>
      )}
    </section>
  );
}
