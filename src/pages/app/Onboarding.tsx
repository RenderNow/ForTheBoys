import {
  Brain,
  CheckCircle,
  Compass,
  Hammer,
  HeartHandshake,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Target,
  Trophy
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { growthAreas } from "../../data/toolPrompts";
import { readStorage, storageKeys, writeStorage } from "../../utils/localStorage";

const iconMap = {
  confidence: Trophy,
  "self-worth": HeartHandshake,
  resilience: Mountain,
  "emotional-awareness": Brain,
  communication: MessageCircle,
  purpose: Compass,
  responsibility: ShieldCheck,
  "positive-choices": CheckCircle,
  ambition: Target,
  brotherhood: Hammer
};

export function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(() => readStorage(storageKeys.selectedPillars, []));

  function toggle(id: string) {
    setSelected((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      writeStorage(storageKeys.selectedPillars, next);
      return next;
    });
  }

  return (
    <section className="flow-screen">
      <div className="progress-header">
        <span>2 of 4</span>
        <div className="progress-track">
          <i />
          <i className="active" />
          <i />
          <i />
        </div>
      </div>
      <div className="screen-heading">
        <h1>What FTB Helps You Build</h1>
        <p>Choose the areas you want to grow.</p>
      </div>

      <div className="selection-grid">
        {growthAreas.map((area) => {
          const Icon = iconMap[area.id as keyof typeof iconMap];
          const isSelected = selected.includes(area.id);

          return (
            <button
              key={area.id}
              className={`select-card ${isSelected ? "selected" : ""}`}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(area.id)}
            >
              <Icon aria-hidden="true" size={24} />
              <span>
                <strong>{area.label}</strong>
                <small>{area.description}</small>
              </span>
              {isSelected && <CheckCircle className="select-check" aria-hidden="true" size={18} />}
            </button>
          );
        })}
      </div>

      <Button disabled={selected.length === 0} onClick={() => navigate("/app/safety-setup")}>
        Continue
      </Button>
    </section>
  );
}
