import { Compass, Landmark, ShieldCheck, Users } from "lucide-react";
import conceptArt from "../../assets/ftb-concept-overview.jpg";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

const pillars = [
  {
    title: "Stoic Principles",
    text: "Timeless wisdom for modern pressure.",
    Icon: ShieldCheck
  },
  {
    title: "Built For Growth",
    text: "Practical tools to build your best self.",
    Icon: Landmark
  },
  {
    title: "Stay On Course",
    text: "Navigate challenges with clarity.",
    Icon: Compass
  },
  {
    title: "Brotherhood",
    text: "You're not alone. We rise together.",
    Icon: Users
  }
];

export function Landing() {
  return (
    <main className="public-main">
      <section className="public-hero">
        <div className="public-hero-copy">
          <p className="eyebrow">AI-style mentor app pilot</p>
          <h1>FTB</h1>
          <h2>For The Boys</h2>
          <p>
            A pocket mentor for confidence, purpose and better choices. Real guidance. Clear mindset. Better choices.
            All in your pocket.
          </p>
          <div className="public-actions">
            <Button to="/demo">Launch Demo</Button>
            <Button to="/safety" variant="secondary">
              Read Safety
            </Button>
          </div>
        </div>
        <div className="public-hero-art">
          <img src={conceptArt} alt="FTB navy and gold mobile app concept artwork" />
        </div>
      </section>

      <section className="public-grid public-grid-four" aria-label="FTB product principles">
        {pillars.map(({ title, text, Icon }) => (
          <Card key={title} className="public-principle">
            <Icon aria-hidden="true" size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </Card>
        ))}
      </section>

      <section className="public-section public-split">
        <div>
          <p className="eyebrow">Product vision</p>
          <h2>A mobile app prototype that feels calm, premium and safe.</h2>
        </div>
        <Card>
          <p>
            This pilot demonstrates onboarding, safety setup, a daily dashboard, canned mentor chat examples, practical
            tools, a local demo journal, support resources and mock subscription flow.
          </p>
          <p className="muted">
            No accounts. No real AI. No payments. No data sent to a server. Just a focused prototype for the next
            version of FTB.
          </p>
        </Card>
      </section>
    </main>
  );
}
