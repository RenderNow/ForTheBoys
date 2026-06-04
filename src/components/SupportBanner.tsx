import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

type SupportBannerProps = {
  compact?: boolean;
};

export function SupportBanner({ compact = false }: SupportBannerProps) {
  return (
    <aside className={`support-banner ${compact ? "support-banner-compact" : ""}`}>
      <AlertTriangle aria-hidden="true" size={18} />
      <p>
        If you or someone else is in immediate danger, contact emergency services now or speak to a trusted adult nearby.
      </p>
      <Link to="/app/support">Get Support</Link>
    </aside>
  );
}
