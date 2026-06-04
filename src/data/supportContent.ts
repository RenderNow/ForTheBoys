export type SupportSection = {
  title: string;
  body: string;
};

export const trustedAdultScript =
  "I need to tell you something serious. I do not know exactly how to explain it, but I do not feel safe handling it on my own.";

export const supportSections: SupportSection[] = [
  {
    title: "Speak to a trusted adult",
    body: "Choose someone nearby who can actually help: a parent, carer, teacher, youth worker, coach or family member."
  },
  {
    title: "I'm worried about a friend",
    body: "Do not carry it alone. Tell a trusted adult what you have seen or heard, especially if there is any risk of harm."
  },
  {
    title: "Bullying",
    body: "Keep evidence where safe, do not reply in anger, and bring an adult into it early."
  },
  {
    title: "Grooming or sextortion",
    body: "Do not pay, do not send more, and do not handle it alone. Tell a trusted adult or contact official help now."
  },
  {
    title: "Abuse",
    body: "If home, school or any relationship is unsafe, speak to a trusted adult or emergency services. You deserve real help."
  },
  {
    title: "Self-harm thoughts",
    body: "Move near another person, put distance between you and anything dangerous, and tell someone trusted immediately."
  },
  {
    title: "Parent or guardian information",
    body: "FTB is a reflection prototype. It is not therapy, diagnosis, safeguarding support or emergency care."
  }
];
