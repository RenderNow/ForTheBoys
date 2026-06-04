import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  tone?: "default" | "gold" | "danger" | "soft";
};

export function Card({ children, className = "", tone = "default", ...props }: CardProps) {
  return (
    <div className={`card card-${tone} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
