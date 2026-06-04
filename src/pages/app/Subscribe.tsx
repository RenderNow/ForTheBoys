import { Lock, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SupportBanner } from "../../components/SupportBanner";

const benefits = [
  "No ads",
  "No selling your data",
  "Safety support is never behind a paywall",
  "Full mentor access",
  "Full tools",
  "Journal",
  "Weekly reflections"
];

export function Subscribe() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="app-screen subscribe-screen">
      <div className="progress-header">
        <span>4 of 4</span>
        <div className="progress-track">
          <i />
          <i />
          <i />
          <i className="active" />
        </div>
      </div>
      <div className="screen-heading">
        <h1>Build Yourself Properly</h1>
        <p>Invest in the man you're becoming.</p>
      </div>

      <SupportBanner compact />

      <div className="price-choice">
        <Card>
          <label>
            <input type="radio" name="plan" />
            <span>Monthly</span>
            <strong>£3.99</strong>
            <small>per month</small>
          </label>
        </Card>
        <Card tone="gold">
          <span className="best-value">Best Value</span>
          <label>
            <input type="radio" name="plan" defaultChecked />
            <span>Yearly</span>
            <strong>£39.99</strong>
            <small>per year</small>
          </label>
          <p>12 months for the price of 10</p>
        </Card>
      </div>

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
          Safety support is never behind a paywall
        </span>
      </Card>

      <ul className="benefit-list">
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <Button onClick={() => setShowModal(true)}>Start Yearly</Button>

      {showModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
          <Card className="modal-card">
            <button className="modal-close" type="button" aria-label="Close modal" onClick={() => setShowModal(false)}>
              <X aria-hidden="true" size={18} />
            </button>
            <h2 id="payment-modal-title">Payments are not active in this prototype.</h2>
            <p>This screen shows the future subscription concept only. No payment details are collected.</p>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Card>
        </div>
      )}
    </section>
  );
}
