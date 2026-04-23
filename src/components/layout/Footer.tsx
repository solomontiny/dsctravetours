import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { navLinks, site } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt={`${site.name} logo`} className="h-10 w-auto" width={160} height={40} />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A legally registered travel agency committed to delivering excellent, quality service and
              unforgettable travel experiences for individuals and corporate clients within and outside Nigeria.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, href: site.social.instagram, label: "Instagram" },
                { icon: Facebook, href: site.social.facebook, label: "Facebook" },
                { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: site.social.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-primary hover:border-primary/40"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-primary">{site.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Crafted with care in Lagos, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
