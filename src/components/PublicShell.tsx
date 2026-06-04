import { Link, Outlet } from "react-router-dom";
import { BrandMark } from "./BrandMark";
import { Button } from "./Button";

export function PublicShell() {
  return (
    <div className="public-shell">
      <header className="public-header">
        <BrandMark />
        <nav aria-label="Public navigation">
          <Link to="/safety">Safety</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </nav>
        <Button to="/demo" className="public-cta">
          Start Demo
        </Button>
      </header>
      <Outlet />
    </div>
  );
}
