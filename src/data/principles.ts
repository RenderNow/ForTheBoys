export type DailyPrinciple = {
  id: string;
  title: string;
  prompt: string;
  action: string;
};

export const dailyPrinciples: DailyPrinciple[] = [
  {
    id: "control",
    title: "Control what you can control",
    prompt: "What is one thing in your control today?",
    action: "Do one small thing your future self will respect."
  },
  {
    id: "character",
    title: "Character shows in what you do next",
    prompt: "What choice would protect your character today?",
    action: "Pause before reacting."
  },
  {
    id: "discipline",
    title: "Discipline is built in small honest moves",
    prompt: "Where do you need to show up today?",
    action: "Give one important thing 20 focused minutes."
  }
];

export function getTodayPrinciple() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Number(new Date()) - Number(start);
  const day = Math.floor(diff / 86_400_000);

  return dailyPrinciples[day % dailyPrinciples.length];
}
