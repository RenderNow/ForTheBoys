import { Compass, Hammer, HeartHandshake } from "lucide-react";
import { Card } from "../../components/Card";

export function About() {
  return (
    <main className="public-main public-narrow">
      <section className="public-page-heading">
        <p className="eyebrow">Mission</p>
        <h1>For confidence, purpose and better choices.</h1>
        <p>
          FTB exists to help boys and young men slow down, think clearly, speak better, take responsibility and build a
          life they respect.
        </p>
      </section>

      <section className="public-grid">
        <Card>
          <Compass aria-hidden="true" />
          <h2>Direction</h2>
          <p>Help users choose a next step without pretending they need their whole life solved.</p>
        </Card>
        <Card>
          <Hammer aria-hidden="true" />
          <h2>Discipline</h2>
          <p>Turn principles into small actions that can be done today.</p>
        </Card>
        <Card>
          <HeartHandshake aria-hidden="true" />
          <h2>Brotherhood</h2>
          <p>Keep the tone warm, safe and grounded. Strong does not mean alone.</p>
        </Card>
      </section>
    </main>
  );
}
