export const storageKeys = {
  onboardingComplete: "ftb_onboarding_complete",
  ageBand: "ftb_age_band",
  selectedPillars: "ftb_selected_pillars",
  moodEntries: "ftb_mood_entries",
  journalEntries: "ftb_journal_entries",
  toolOutputs: "ftb_tool_outputs"
} as const;

export type MoodEntry = {
  id: string;
  date: string;
  mood: string;
  response: string;
  principle: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  text: string;
};

export type ToolOutput = {
  id: string;
  date: string;
  tool: string;
  title: string;
  summary: string;
  content: string;
};

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function readStorage<T>(key: string, fallback: T): T {
  if (!hasStorage()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (!hasStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function appendStorageItem<T>(key: string, item: T) {
  const current = readStorage<T[]>(key, []);
  const next = [item, ...current];
  writeStorage(key, next);
  return next;
}

export function removeStorageItem<T extends { id: string }>(key: string, id: string) {
  const current = readStorage<T[]>(key, []);
  const next = current.filter((item) => item.id !== id);
  writeStorage(key, next);
  return next;
}

export function resetPrototypeData() {
  if (!hasStorage()) {
    return;
  }

  Object.values(storageKeys).forEach((key) => window.localStorage.removeItem(key));
}
