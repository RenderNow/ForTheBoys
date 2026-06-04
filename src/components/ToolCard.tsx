import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type ToolCardProps = {
  description: string;
  icon: ReactNode;
  title: string;
  to: string;
};

export function ToolCard({ description, icon, title, to }: ToolCardProps) {
  return (
    <Link className="tool-card-link" to={to}>
      <span className="tool-icon" aria-hidden="true">
        {icon}
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <ArrowRight aria-hidden="true" size={18} />
    </Link>
  );
}
