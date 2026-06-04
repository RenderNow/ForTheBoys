import { PenLine, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";
import {
  appendStorageItem,
  createId,
  type JournalEntry,
  type MoodEntry,
  readStorage,
  removeStorageItem,
  resetPrototypeData,
  storageKeys,
  type ToolOutput
} from "../../utils/localStorage";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function Journal() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => readStorage(storageKeys.moodEntries, []));
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() =>
    readStorage(storageKeys.journalEntries, [])
  );
  const [toolOutputs, setToolOutputs] = useState<ToolOutput[]>(() => readStorage(storageKeys.toolOutputs, []));
  const [manualEntry, setManualEntry] = useState("");

  function saveManualEntry() {
    const text = manualEntry.trim();

    if (!text) {
      return;
    }

    const next = appendStorageItem<JournalEntry>(storageKeys.journalEntries, {
      id: createId(),
      date: new Date().toISOString(),
      text
    });
    setJournalEntries(next);
    setManualEntry("");
  }

  function resetAll() {
    resetPrototypeData();
    setMoodEntries([]);
    setJournalEntries([]);
    setToolOutputs([]);
    setManualEntry("");
  }

  return (
    <section className="app-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Journal</p>
        <h1>Your demo reflections.</h1>
        <p>Prototype note: entries are stored only on this device/browser for demo purposes.</p>
      </div>

      <SupportBanner compact />

      <Card>
        <h2>Manual journal entry</h2>
        <textarea
          value={manualEntry}
          onChange={(event) => setManualEntry(event.target.value)}
          placeholder="Write a private demo reflection..."
        />
        <Button onClick={saveManualEntry}>
          <PenLine aria-hidden="true" size={17} />
          Save Entry
        </Button>
      </Card>

      <section className="journal-section">
        <h2>Mood check-ins</h2>
        {moodEntries.length === 0 ? (
          <p className="empty-state">No mood check-ins saved yet.</p>
        ) : (
          moodEntries.map((entry) => (
            <Card key={entry.id} className="journal-item">
              <span>{formatDate(entry.date)}</span>
              <h3>{entry.mood}</h3>
              <p>{entry.response}</p>
              <button
                type="button"
                aria-label="Delete mood entry"
                onClick={() => setMoodEntries(removeStorageItem<MoodEntry>(storageKeys.moodEntries, entry.id))}
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </Card>
          ))
        )}
      </section>

      <section className="journal-section">
        <h2>Tool outputs</h2>
        {toolOutputs.length === 0 ? (
          <p className="empty-state">No tool outputs saved yet.</p>
        ) : (
          toolOutputs.map((entry) => (
            <Card key={entry.id} className="journal-item">
              <span>{formatDate(entry.date)}</span>
              <h3>{entry.title}</h3>
              <pre>{entry.content}</pre>
              <button
                type="button"
                aria-label="Delete tool output"
                onClick={() => setToolOutputs(removeStorageItem<ToolOutput>(storageKeys.toolOutputs, entry.id))}
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </Card>
          ))
        )}
      </section>

      <section className="journal-section">
        <h2>Manual entries</h2>
        {journalEntries.length === 0 ? (
          <p className="empty-state">No manual entries saved yet.</p>
        ) : (
          journalEntries.map((entry) => (
            <Card key={entry.id} className="journal-item">
              <span>{formatDate(entry.date)}</span>
              <p>{entry.text}</p>
              <button
                type="button"
                aria-label="Delete journal entry"
                onClick={() => setJournalEntries(removeStorageItem<JournalEntry>(storageKeys.journalEntries, entry.id))}
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </Card>
          ))
        )}
      </section>

      <Button variant="danger" onClick={resetAll}>
        <RotateCcw aria-hidden="true" size={17} />
        Reset Prototype Data
      </Button>
    </section>
  );
}
