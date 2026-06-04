import { defaultMentorResponse, mentorResponses } from "../data/mentorResponses";
import { detectSafetyKeyword } from "./safetyKeywords";

export const seriousSafetyResponse =
  "This sounds serious and bigger than an app conversation. FTB is not an emergency service. If you or someone else might be in immediate danger, contact emergency services now or speak to a trusted adult nearby.";

export function getMockMentorResponse(input: string) {
  const safetyMatch = detectSafetyKeyword(input);

  if (safetyMatch) {
    return {
      type: "safety" as const,
      response: seriousSafetyResponse
    };
  }

  const lower = input.toLowerCase();
  const match = mentorResponses.find((item) => item.keywords.some((keyword) => lower.includes(keyword)));

  return {
    type: "normal" as const,
    response: match?.response ?? defaultMentorResponse
  };
}
