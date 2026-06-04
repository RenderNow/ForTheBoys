import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

export function Pricing() {
  return (
    <main className="public-main public-narrow">
      <section className="public-page-heading">
        <p className="eyebrow">Mock pricing</p>
        <h1>Build yourself properly.</h1>
        <p>Future pricing concept only. Payments are not active in this prototype.</p>
      </section>

      <section className="pricing-grid">
        <Card>
          <h2>Monthly</h2>
          <p className="price">£3.99</p>
          <span className="muted">per month</span>
        </Card>
        <Card tone="gold" className="best-value-card">
          <span className="best-value">Best Value</span>
          <h2>Yearly</h2>
          <p className="price">£39.99</p>
          <span className="muted">per year</span>
        </Card>
      </section>

      <Card className="benefit-row">
        <span>
          <ShieldCheck aria-hidden="true" />
          No ads
        </span>
        <span>
          <Lock aria-hidden="true" />
          No selling your data
        </span>
        <span>
          <Sparkles aria-hidden="true" />
          Support is never behind a paywall
        </span>
      </Card>

      <Button to="/app/subscribe">Open App Subscribe Screen</Button>
    </main>
  );
}
