import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div className={`phone-preview ${className}`.trim()} aria-label="FTB app preview">
      <div className="phone-preview-notch" aria-hidden="true" />
      <div className="phone-preview-screen">{children}</div>
    </div>
  );
}
