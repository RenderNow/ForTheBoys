export const safetyKeywords = [
  "kill myself",
  "want to die",
  "hurt myself",
  "hurt someone",
  "stab",
  "weapon",
  "abuse",
  "nudes",
  "blackmail",
  "overdose",
  "suicide"
];

export function detectSafetyKeyword(input: string) {
  const text = input.toLowerCase();
  return safetyKeywords.find((keyword) => text.includes(keyword));
}
