export type GrowthArea = {
  id: string;
  label: string;
  description: string;
};

export const growthAreas: GrowthArea[] = [
  { id: "confidence", label: "Confidence", description: "Build evidence through small action." },
  { id: "self-worth", label: "Self-worth", description: "Speak honestly without cruelty." },
  { id: "resilience", label: "Resilience", description: "Recover without folding." },
  { id: "emotional-awareness", label: "Emotional Awareness", description: "Name feelings before reacting." },
  { id: "communication", label: "Communication", description: "Say it clearly and calmly." },
  { id: "purpose", label: "Purpose", description: "Find the next right step." },
  { id: "responsibility", label: "Responsibility", description: "Own your choices." },
  { id: "positive-choices", label: "Positive Choices", description: "Protect your future self." },
  { id: "ambition", label: "Ambition", description: "Build with discipline." },
  { id: "brotherhood", label: "Brotherhood", description: "You are not alone." }
];

export const moodResponses: Record<string, string> = {
  Steady: "Good. Protect the steady state by keeping your next move simple and honest.",
  Motivated: "Use the energy while it is here. Pick one thing and start before the feeling fades.",
  Frustrated:
    "Let's slow this down. Frustration is information, not an instruction. Before you react, choose one useful next move.",
  Angry:
    "Anger can warn you that something matters, but it should not drive the car. Pause before you send, say or do anything.",
  Low: "You do not have to pretend you are fine. Start with one respectful action: water, food, movement or telling someone trusted.",
  Numb: "Numb still counts as information. Do one grounding action and keep this moment smaller than the whole day.",
  Overwhelmed:
    "Do not try to solve everything at once. Name the next ten-minute action and leave the rest outside the door for now."
};

export const moodOptions = Object.keys(moodResponses);

export const toolCards = [
  {
    id: "confidence",
    title: "Confidence Builder",
    description: "Turn recent effort into proof and one small courage move.",
    to: "/app/tools/confidence"
  },
  {
    id: "say-it-properly",
    title: "Say It Properly",
    description: "Rewrite rough communication into something calmer and clearer.",
    to: "/app/tools/say-it-properly"
  },
  {
    id: "purpose",
    title: "Purpose Planner",
    description: "Find direction without needing your whole life solved.",
    to: "/app/tools/purpose"
  },
  {
    id: "self-worth",
    title: "Self-Worth Journal",
    description: "Replace harsh self-talk with honest, useful reflection.",
    to: "/app/tools/self-worth"
  }
];
