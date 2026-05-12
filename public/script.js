const flows = {
  anger: {
    label: "Anger reset",
    heading: "Pause before you react.",
    mentorOne: "You cannot control what was said. You can control what you do next.",
    user: "I want to message him back now.",
    mentorTwo: "Then we slow down first. What outcome do you actually want in one hour?",
    steps: ["Breathe for 30 seconds", "Write it but do not send", "Speak to someone trusted"]
  },
  overwhelm: {
    label: "Overwhelm reset",
    heading: "Control the next step.",
    mentorOne: "Name the pressure. Then separate what is yours from what is not yours.",
    user: "Everything feels too much today.",
    mentorTwo: "You do not need to fix the whole day. Choose one useful action for the next ten minutes.",
    steps: ["Put the phone down", "Write the one task", "Ask for help if needed"]
  },
  rejection: {
    label: "Rejection reflection",
    heading: "Do not let shame lead.",
    mentorOne: "Embarrassment is uncomfortable. It is not an instruction.",
    user: "I feel stupid about what happened.",
    mentorTwo: "The stronger move is to learn from it without attacking yourself.",
    steps: ["Describe the facts", "Drop the insults", "Choose one repair action"]
  },
  discipline: {
    label: "Discipline builder",
    heading: "Return to the work.",
    mentorOne: "Discipline is not a feeling. It is the next honest action.",
    user: "I keep putting it off.",
    mentorTwo: "Start smaller. Ten focused minutes is better than another promise.",
    steps: ["Clear the desk", "Set a ten-minute timer", "Finish one visible piece"]
  },
  decision: {
    label: "Decision mentor",
    heading: "Think past the impulse.",
    mentorOne: "Before you choose, look at the consequence you are accepting.",
    user: "I need to decide what to do.",
    mentorTwo: "A strong decision respects your future self, not only your current mood.",
    steps: ["List the options", "Name the consequence", "Choose the respectful action"]
  }
};

const flowLabel = document.querySelector("#flow-label");
const flowHeading = document.querySelector("#flow-heading");
const mentorOne = document.querySelector("#mentor-one");
const userLine = document.querySelector("#user-line");
const mentorTwo = document.querySelector("#mentor-two");
const microSteps = document.querySelector("#micro-steps");
const flowButtons = document.querySelectorAll("[data-flow]");

function setFlow(key) {
  const flow = flows[key];

  if (!flow) {
    return;
  }

  flowLabel.textContent = flow.label;
  flowHeading.textContent = flow.heading;
  mentorOne.textContent = flow.mentorOne;
  userLine.textContent = flow.user;
  mentorTwo.textContent = flow.mentorTwo;
  microSteps.replaceChildren(...flow.steps.map((step) => {
    const item = document.createElement("span");
    item.textContent = step;
    return item;
  }));

  flowButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.flow === key);
  });
}

flowButtons.forEach((button) => {
  button.addEventListener("click", () => setFlow(button.dataset.flow));
});
