export type MentorResponse = {
  id: string;
  keywords: string[];
  response: string;
};

export const mentorPromptCards = [
  "I feel stuck",
  "Help me calm down",
  "I need confidence",
  "Help me reply properly",
  "I messed up",
  "I need a next step"
];

export const mentorResponses: MentorResponse[] = [
  {
    id: "anger",
    keywords: ["angry", "rage", "furious", "fight", "calm down", "mad"],
    response:
      "I hear how angry you are. Anger can be useful information, but it is a bad driver. Before you send anything or do anything, let's slow this down. Are you safe right now, and is anyone at risk of getting hurt?"
  },
  {
    id: "low",
    keywords: ["low", "sad", "down", "empty", "numb", "depressed", "stuck"],
    response:
      "I'm glad you said it instead of pretending you're fine. Feeling low does not make you weak. Has this feeling just come up today, or has it been building for a while?"
  },
  {
    id: "confidence",
    keywords: ["confidence", "self doubt", "not good enough", "scared", "nervous"],
    response:
      "Confidence is built with evidence. Name one thing you did recently that took effort, even if it was small."
  },
  {
    id: "communication",
    keywords: ["reply", "message", "text", "say", "communication", "properly"],
    response: "Write the rough version first. Then we'll make it calmer, clearer and stronger."
  },
  {
    id: "purpose",
    keywords: ["lost", "purpose", "direction", "future", "next step", "avoid"],
    response:
      "You do not need your whole life solved. Start with one honest next step. What kind of man are you trying to become?"
  },
  {
    id: "repair",
    keywords: ["messed up", "mistake", "apologise", "sorry", "regret"],
    response:
      "Owning it properly is stronger than hiding from it. What happened, what part is yours to repair, and what can you do without making excuses?"
  }
];

export const defaultMentorResponse =
  "Let's slow this down. What happened in one sentence, and what is the next right step you can take without making things worse?";
