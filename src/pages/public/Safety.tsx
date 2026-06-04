import { AlertTriangle, LifeBuoy, ShieldCheck } from "lucide-react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

export function Safety() {
  return (
    <main className="public-main public-narrow">
      <section className="public-page-heading">
        <p className="eyebrow">Safety first</p>
        <h1>What FTB is and is not.</h1>
        <p>
          FTB is an AI-style mentor experience for reflection, confidence, emotional awareness and better choices. It is
          not a crisis service or replacement for real-world help.
        </p>
      </section>

      <Card tone="danger" className="support-callout">
        <AlertTriangle aria-hidden="true" />
        <div>
          <h2>If there is immediate danger</h2>
          <p>Contact emergency services now or speak to a trusted adult nearby.</p>
        </div>
      </Card>

      <section className="public-grid">
        <Card>
          <ShieldCheck aria-hidden="true" />
          <h2>FTB can support reflection.</h2>
          <p>It can help users slow down, name what is happening, and choose a safer next step.</p>
        </Card>
        <Card>
          <LifeBuoy aria-hidden="true" />
          <h2>FTB cannot replace human help.</h2>
          <p>It is not a therapist, doctor, safeguarding professional, emergency service or trusted adult.</p>
        </Card>
      </section>

      <Card>
        <h2>Prototype note</h2>
        <p>
          In this first version, mentor chat uses example responses only. The simple keyword trigger is only a prototype
          safeguard and is not a replacement for proper AI moderation, risk classification or human review.
        </p>
        <Button to="/app/support" variant="secondary">
          Open Support
        </Button>
      </Card>
    </main>
  );
}
