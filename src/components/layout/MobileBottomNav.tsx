import { NavLink } from "react-router-dom";
import { Home, Briefcase, Compass, MessageSquare, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/packages", label: "Tours", icon: Compass },
  { to: "/contact", label: "Book", icon: MessageSquare },
];

const MobileBottomNav = () => {
  const { user } = useAuth();
  const accountTo = user ? "/dashboard" : "/auth";
  const all = [...items, { to: accountTo, label: user ? "Me" : "Sign in", icon: UserIcon }];

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {all.map(({ to, label, icon: Icon, end }) => (
          <li key={to + label}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  isActive ? "text-accent" : "text-muted-foreground hover:text-primary"
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
