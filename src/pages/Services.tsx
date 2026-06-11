import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plane, ShieldCheck, Hotel, FileCheck2, Car, Briefcase, Map, ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import ServiceQuickView, { type ServiceDetail } from "@/components/ServiceQuickView";
import servicesHero from "@/assets/service-flight.jpg";

const services: ServiceDetail[] = [
  {
    icon: Plane,
    title: "Flight Booking",
    text: "Domestic and international flights through trusted IATA partners — best fares, best routings, every time.",
    bullets: ["Economy, premium & business class", "Best-fare search across global GDS", "24/7 reschedule assistance"],
  },
  {
    icon: FileCheck2,
    title: "Visa Processing",
    text: "End-to-end visa support: documentation, appointments and follow-through to a successful outcome.",
    bullets: ["Schengen, UK, US, Canada, UAE & more", "Document review & cover letters", "98% approval success rate"],
  },
  {
    icon: Hotel,
    title: "Hotel Reservation",
    text: "Hand-picked accommodation across boutique, business and five-star — matched to your style.",
    bullets: ["Negotiated rates with global chains", "Boutique & resort specialists", "Free cancellation options"],
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    text: "Travel insurance is a mandatory requirement at all Schengen embassies including France, Germany, Italy, Netherlands, Iceland, Luxembourg, Belgium, Sweden, Denmark, Greece, Finland, Norway, Spain, Portugal, Slovakia, Slovenia, Malta, Lithuania, Latvia, Hungary, Estonia, Czech Republic, Austria, Bulgaria, Romania, Switzerland and Poland. Our travel insurance plan is fully recognized and accepted by both Schengen and non-Schengen embassies. Available for corporate entities and individuals.",
    bullets: [
      "Schengen-compliant insurance accepted by all embassies",
      "Medical, baggage & emergency evacuation cover",
      "Available for individuals and corporate clients"
    ],
  },
  {
    icon: Car,
    title: "Airport Pickup & Drop-off",
    text: "Discreet, on-time chauffeur service in Lagos and key cities worldwide.",
    bullets: ["Meet & greet at arrivals", "Executive sedans & SUVs", "Flight-tracking included"],
  },
  {
    icon: Briefcase,
    title: "Protocol Service",
    text: "VIP handling and fast-track immigration at major airports for clients who value time.",
    bullets: ["Lounge access & fast-track", "Baggage assistance", "Lagos, Abuja, London, Dubai & more"],
  },
  {
    icon: Map,
    title: "Tour Packaging",
    text: "Bespoke itineraries built around your interests, schedule and budget — no two are alike.",
    bullets: ["Custom multi-city itineraries", "Honeymoon, family & group trips", "All-inclusive pricing"],
  },
];

const Services = () => {
  const [active, setActive] = useState<ServiceDetail | null>(null);
  const [open, setOpen] = useState(false);

  const openService = (s: ServiceDetail) => {
    setActive(s);
    setOpen(true);
  };

  return (
    <>
      <Seo
        title="Travel Services"
        description="Flight booking, visa processing, hotel reservations, travel insurance, airport pickup, protocol and bespoke tour packaging."
      />

      <PageHero
        eyebrow="Services"
        title="Everything you need to travel well."
        description="Seven services, one team. We handle the planning, paperwork and logistics so your only job is to show up and enjoy."
        image={servicesHero}
        imageAlt="Aircraft wing above the clouds at sunset"
      />

      <section className="py-14 sm:py-20 md:py-28">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.button
                type="button"
                key={s.title}
                onClick={() => openService(s)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-primary">
                  <s.icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-xl font-medium text-primary">
                  {s.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>

                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity opacity-70 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-brand px-8 py-12 text-center md:px-16 md:py-16">
            <h2 className="font-display text-3xl font-medium text-primary-foreground md:text-4xl">
              Need something custom?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Corporate retreats, medical travel, group pilgrimages — we've done it. Tell us what you need.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-7 rounded-full px-7">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceQuickView service={active} open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Services;