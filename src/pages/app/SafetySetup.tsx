import { Info, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import { storageKeys, writeStorage } from "../../utils/localStorage";

const ageBands = ["13-15", "16-17", "18+"];

export function SafetySetup() {
  const navigate = useNavigate();
  const [ageBand, setAgeBand] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const isUnder16 = ageBand === "13-15";
  const canContinue = Boolean(ageBand && acknowledged && !isUnder16);

  function continueSafely() {
    if (!canContinue) {
      return;
    }

    writeStorage(storageKeys.ageBand, ageBand);
    writeStorage(storageKeys.onboardingComplete, true);
    navigate("/app/today");
  }

  return (
    <section className="flow-screen">
      <div className="progress-header">
        <span>3 of 4</span>
        <div className="progress-track">
          <i />
          <i />
          <i className="active" />
          <i />
        </div>
      </div>
      <div className="screen-heading">
        <ShieldCheck className="hero-icon" aria-hidden="true" size={54} />
        <h1>Safety Comes First</h1>
        <p>How old are you?</p>
      </div>

      <div className="age-list" role="group" aria-label="Age options">
        {ageBands.map((band) => (
          <button
            key={band}
            className={`age-option ${ageBand === band ? "selected" : ""}`}
            type="button"
            onClick={() => setAgeBand(band)}
          >
            <UserRound aria-hidden="true" size={20} />
            <span>{band}</span>
          </button>
        ))}
      </div>

      {isUnder16 && (
        <Card tone="danger" className="inline-alert">
          <Info aria-hidden="true" />
          <p>This prototype is not available for under-16 use yet.</p>
        </Card>
      )}

      <SupportBanner compact />

      <Card className="demo-boundary">
        <Info aria-hidden="true" />
        <p>
          FTB is an AI-style mentor experience, not a therapist, doctor or emergency service. For this prototype, the
          mentor chat uses example responses only.
        </p>
      </Card>

      <label className="checkbox-row">
        <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />
        <span>I understand this is a demo and not emergency support.</span>
      </label>

      <Button disabled={!canContinue} onClick={continueSafely}>
        Continue Safely
      </Button>
    </section>
  );
}
