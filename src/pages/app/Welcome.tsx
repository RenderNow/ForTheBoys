import { ShieldCheck } from "lucide-react";
import conceptArt from "../../assets/ftb-concept-overview.jpg";
import { Button } from "../../components/Button";

export function Welcome() {
  return (
    <section className="welcome-screen">
      <div
        className="welcome-art"
        aria-hidden="true"
        style={{ backgroundImage: `linear-gradient(rgba(7, 17, 29, 0.18), #07111d 78%), url(${conceptArt})` }}
      />
      <div className="welcome-content">
        <div className="welcome-mark" aria-hidden="true">
          <span>FTB</span>
        </div>
        <h1>For The Boys</h1>
        <p>A pocket mentor for confidence, purpose and better choices.</p>
        <Button to="/app/onboarding">Get Started</Button>
        <div className="welcome-footer">
          <ShieldCheck aria-hidden="true" size={16} />
          <span>Built on principles. Backed by purpose.</span>
        </div>
      </div>
    </section>
  );
}
