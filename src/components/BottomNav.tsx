import { BookOpen, Home, LifeBuoy, MessageCircle, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app/today", label: "Today", Icon: Home },
  { to: "/app/mentor", label: "Mentor", Icon: MessageCircle },
  { to: "/app/tools", label: "Tools", Icon: Wrench },
  { to: "/app/journal", label: "Journal", Icon: BookOpen },
  { to: "/app/support", label: "Support", Icon: LifeBuoy }
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="App navigation">
      {navItems.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : undefined)}>
          <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
