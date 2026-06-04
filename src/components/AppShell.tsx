import { ChevronLeft, LifeBuoy } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { BrandMark } from "./BrandMark";

const setupRoutes = ["/app/welcome", "/app/onboarding", "/app/safety-setup"];
const rootRoutes = ["/app/welcome", "/app/today"];

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const showBottomNav = !setupRoutes.includes(location.pathname);
  const showBack = !rootRoutes.includes(location.pathname);

  return (
    <div className="app-stage">
      <div className="app-device">
        <div className="app-notch" aria-hidden="true" />
        <header className="app-header">
          {showBack ? (
            <button className="icon-button" type="button" aria-label="Go back" onClick={() => navigate(-1)}>
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
          ) : (
            <span className="header-spacer" aria-hidden="true" />
          )}
          <BrandMark compact to={showBottomNav ? "/app/today" : "/"} />
          <Link className="support-link" to="/app/support">
            <LifeBuoy aria-hidden="true" size={15} />
            <span>Get Support</span>
          </Link>
        </header>
        <main className={`app-main ${showBottomNav ? "app-main-with-nav" : ""}`}>
          <Outlet />
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
