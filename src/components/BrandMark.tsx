import { Link } from "react-router-dom";

type BrandMarkProps = {
  compact?: boolean;
  to?: string;
};

export function BrandMark({ compact = false, to = "/" }: BrandMarkProps) {
  return (
    <Link className={`brand-lockup ${compact ? "brand-compact" : ""}`} to={to} aria-label="FTB For The Boys">
      <span className="brand-laurel" aria-hidden="true" />
      <span className="brand-text">
        <strong>FTB</strong>
        {!compact && <small>For The Boys</small>}
      </span>
    </Link>
  );
}
