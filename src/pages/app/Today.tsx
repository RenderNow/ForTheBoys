import { BookOpen, LifeBuoy, MessageCircle, PenLine } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import { getTodayPrinciple } from "../../data/principles";
import { moodOptions, moodResponses } from "../../data/toolPrompts";
import {
  appendStorageItem,
  createId,
  type JournalEntry,
  type MoodEntry,
  storageKeys
} from "../../utils/localStorage";

export function Today() {
  const principle = getTodayPrinciple();
  const [selectedMood, setSelectedMood] = useState("");
  const [moodResponse, setMoodResponse] = useState("");
  const [reflection, setReflection] = useState("");
  const [savedReflection, setSavedReflection] = useState(false);

  function chooseMood(mood: string) {
    const response = moodResponses[mood];
    setSelectedMood(mood);
    setMoodResponse(response);
    appendStorageItem<MoodEntry>(storageKeys.moodEntries, {
      id: createId(),
      date: new Date().toISOString(),
      mood,
      response,
      principle: principle.title
    });
  }

  function saveReflection() {
    const text = reflection.trim();

    if (!text) {
      return;
    }

    appendStorageItem<JournalEntry>(storageKeys.journalEntries, {
      id: createId(),
      date: new Date().toISOString(),
      text
    });
    setReflection("");
    setSavedReflection(true);
  }

  return (
    <section className="app-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Today</p>
        <h1>Start steady.</h1>
        <p>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
      </div>

      <SupportBanner compact />

      <Card tone="gold" className="principle-card">
        <span>Today's Principle</span>
        <h2>{principle.title}</h2>
        <p>{principle.prompt}</p>
      </Card>

      <Card>
        <h2>Today's Move</h2>
        <p>{principle.action}</p>
      </Card>

      <Card>
        <h2>Mood check-in</h2>
        <div className="mood-grid">
          {moodOptions.map((mood) => (
            <button
              key={mood}
              className={selectedMood === mood ? "selected" : ""}
              type="button"
              onClick={() => chooseMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        {selectedMood && (
          <div className="mood-response">
            <strong>You chose "{selectedMood}".</strong>
            <p>{moodResponse}</p>
          </div>
        )}
      </Card>

      <Card>
        <h2>Reflection</h2>
        <label className="field-label" htmlFor="today-reflection">
          What is one thing in your control today?
        </label>
        <textarea
          id="today-reflection"
          value={reflection}
          onChange={(event) => {
            setReflection(event.target.value);
            setSavedReflection(false);
          }}
          placeholder="Write one honest sentence."
        />
        <Button variant="secondary" onClick={saveReflection}>
          <PenLine aria-hidden="true" size={17} />
          Save Reflection
        </Button>
        {savedReflection && <p className="save-note">Saved to your demo journal on this device.</p>}
      </Card>

      <div className="quick-actions">
        <Button to="/app/mentor">
          <MessageCircle aria-hidden="true" size={18} />
          Mentor
        </Button>
        <Button to="/app/support" variant="secondary">
          <LifeBuoy aria-hidden="true" size={18} />
          Support
        </Button>
        <Button to="/app/journal" variant="ghost">
          <BookOpen aria-hidden="true" size={18} />
          Journal
        </Button>
      </div>
    </section>
  );
}
