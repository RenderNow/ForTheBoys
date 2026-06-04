import { AlertTriangle, LifeBuoy, ShieldCheck } from "lucide-react";
import { Card } from "../../components/Card";
import { trustedAdultScript, supportSections } from "../../data/supportContent";

export function Support() {
  return (
    <section className="app-screen support-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Get Support</p>
        <h1>Real help comes first.</h1>
        <p>FTB can support reflection, but it cannot replace real-world help.</p>
      </div>

      <Card tone="danger" className="support-callout">
        <AlertTriangle aria-hidden="true" />
        <div>
          <h2>Get Help Now</h2>
          <p>If you or someone else is in immediate danger, contact emergency services now.</p>
        </div>
      </Card>

      <Card tone="gold">
        <LifeBuoy aria-hidden="true" />
        <h2>Trusted adult script</h2>
        <p className="script-quote">"{trustedAdultScript}"</p>
      </Card>

      <div className="support-topic-list">
        {supportSections.map((section) => (
          <Card key={section.title}>
            <ShieldCheck aria-hidden="true" />
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </Card>
        ))}
      </div>

      <Card className="demo-boundary">
        <p>
          Support is never behind a paywall in this prototype. This screen is available without login, subscription or
          payment.
        </p>
      </Card>
    </section>
  );
}
