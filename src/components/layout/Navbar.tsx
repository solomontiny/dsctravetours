import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, profile, signOut } = useAuth();
  const initial = (profile?.display_name || user?.email || "?").slice(0, 1).toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-soft border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label={site.name}>
          <img src={logo} alt={`${site.name} logo`} className="h-9 w-auto md:h-10" width={160} height={40} />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors link-underline",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-soft" aria-label="Account menu">
                  {initial}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{profile?.display_name || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />My dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/contact">Book a trip</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/auth"><UserIcon className="mr-1 h-4 w-4" />Sign in</Link>
            </Button>
          )}
          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/contact">Book a trip</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur"
          >
            <div className="container-wide flex flex-col py-4">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "py-3 text-base font-medium border-b border-border/50 last:border-0",
                      isActive ? "text-primary" : "text-foreground/80"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button asChild className="mt-4 rounded-full">
                <Link to="/contact">Book a trip</Link>
              </Button>
              {user ? (
                <>
                  <Button asChild variant="outline" className="mt-2 rounded-full"><Link to="/dashboard">My dashboard</Link></Button>
                  <Button onClick={signOut} variant="ghost" className="mt-1 rounded-full">Sign out</Button>
                </>
              ) : (
                <Button asChild variant="outline" className="mt-2 rounded-full"><Link to="/auth">Sign in / Create account</Link></Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
