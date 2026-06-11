import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Plane, Globe2, MessageCircle, ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import aboutHero from "@/assets/dest-capetown.jpg";

import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import DestinationQuickView, { type QuickViewDestination } from "@/components/DestinationQuickView";
import { buildWhatsAppUrl, destinationWhatsAppMessage } from "@/lib/whatsapp";

import seychelles from "@/assets/dest-maldives.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import mauritius from "@/assets/dest-zanzibar.jpg";
import fiji from "@/assets/dest-bali.jpg";
import barbados from "@/assets/dest-santorini.jpg";
import ghana from "@/assets/dest-capetown.jpg";
import rwanda from "@/assets/dest-capetown.jpg";
import dominica from "@/assets/dest-bali.jpg";

const schengenCountries = [
  "France", "Germany", "Italy", "Netherlands", "Iceland", "Luxembourg", "Belgium",
  "Sweden", "Denmark", "Greece", "Finland", "Norway", "Spain", "Portugal", "Slovakia",
  "Slovenia", "Malta", "Lithuania", "Latvia", "Hungary", "Estonia", "Czech Republic",
  "Austria", "Bulgaria", "Romania", "Switzerland", "Poland",
];

type Destination = {
  name: string;
  tagline: string;
  body: string;
  image: string;
};

const destinations: Destination[] = [
  {
    name: "Seychelles",
    tagline: "A tropical paradise",
    body: "Dreaming of pristine beaches, turquoise waters, and lush landscapes? Seychelles, an archipelago in the Indian Ocean, allows Nigerian passport holders to enter visa-free. Immerse yourself in the beauty of nature, explore coral reefs, and relax on some of the world's most breathtaking beaches.",
    image: seychelles,
  },
  {
    name: "Maldives",
    tagline: "Serenity in the Indian Ocean",
    body: "Escape to the Maldives, where overwater bungalows, vibrant coral atolls, and crystal-clear waters await. As a Nigerian passport holder, you can enjoy the wonders of this tropical paradise without the need for a visa. Snorkel in vibrant coral gardens, relax on white-sand beaches, and experience the true meaning of luxury.",
    image: maldives,
  },
  {
    name: "Mauritius",
    tagline: "Island bliss",
    body: "For a taste of island culture and natural beauty, Mauritius is a visa-free haven for Nigerian passport holders. With its friendly locals, vibrant coral reefs, and traditional villages, Mauritius offers a unique blend of adventure and relaxation.",
    image: mauritius,
  },
  {
    name: "Fiji",
    tagline: "Pacific Island charms",
    body: "Beyond the luxury resorts, immerse yourself in true Pacific Island culture. Visit local islands, interact with friendly locals, and savor authentic cuisine. Fiji offers a laid-back atmosphere, providing you the opportunity to connect with the genuine charm of the islands.",
    image: fiji,
  },
  {
    name: "Barbados",
    tagline: "Caribbean delight",
    body: "Indulge in the laid-back charm of the Caribbean by heading to Barbados, where Nigerian passport holders can enjoy a visa-free stay. Explore historic Bridgetown, bask in the sun on beautiful beaches, and immerse yourself in the vibrant local culture.",
    image: barbados,
  },
  {
    name: "Ghana",
    tagline: "West African gem",
    body: "For a visa-free getaway closer to home, Ghana beckons with its rich history, cultural heritage, and warm hospitality. Discover the historic Cape Coast Castle, explore bustling markets, and experience the lively rhythms of West African music and dance.",
    image: ghana,
  },
  {
    name: "Rwanda",
    tagline: "The land of a thousand hills",
    body: "Rwanda, known for its breathtaking landscapes and gorilla trekking experiences, allows Nigerian passport holders to enter visa-free. Immerse yourself in the natural beauty of rolling hills, lush rainforests, and encounter the incredible wildlife that calls Rwanda home.",
    image: rwanda,
  },
  {
    name: "Dominica",
    tagline: "Nature's playground in the Caribbean",
    body: "Nature lovers will find solace in Dominica, a Caribbean gem that welcomes Nigerian passport holders without requiring a visa. Explore lush rainforests, volcanic landscapes, and immerse yourself in the island's commitment to preserving its natural wonders.",
    image: dominica,
  },
];

const buildWaUrl = (destination: string) =>
  buildWhatsAppUrl(destinationWhatsAppMessage(destination));

const About = () => {
  const [quickDest, setQuickDest] = useState<QuickViewDestination | null>(null);
  const [quickOpen, setQuickOpen] = useState(false);
  const openQuick = (d: QuickViewDestination) => {
    setQuickDest(d);
    setQuickOpen(true);
  };

  return (
  <>
    <Seo
      title="About — Travel Insurance & Visa-Free Destinations"
      description="Travel insurance for Schengen and Non-Schengen embassies, plus the top visa-free destinations for Nigerian passport holders — with DSC Travels & Tours."
    />
    <PageHero
      eyebrow="About travel insurance"
      title="Travel safe. Travel free. Travel beyond ordinary."
      description="DSC Travels and Tours partners with leading insurance providers and helps Nigerian passport holders unlock the world — visa-free."
      image={aboutHero}
      imageAlt="Cape Town coastline with Table Mountain"
    />

    {/* Travel Insurance */}
    <section className="py-14 sm:py-20 md:py-28">
      <div className="container-tight grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Travel insurance</span>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-primary md:text-4xl">
            Cover for the unexpected — wherever the journey takes you.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Travelling is always an exciting activity — be it for leisure or business. The fun and excitement
              comes with the responsibility to make your journey safe. Your desire to have a fun-filled trip
              without worries is what we aim to achieve.
            </p>
            <p>
              <strong className="text-primary">DSC Travels and Tours</strong>, in partnership with leading
              insurance companies, provides cover against a broad range of mishaps — medical emergencies,
              trip cancellations, lost baggage and more.
            </p>
            <p>
              Travel insurance is a <strong className="text-primary">mandatory requirement</strong> at all
              Schengen embassies. Our Travel Insurance Plan is recognised and accepted at all Schengen and
              Non-Schengen embassies.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/contact">Get an insurance quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <a
                href={buildWaUrl("travel insurance")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border/70 bg-card p-6 shadow-card md:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-medium text-primary">Accepted at Schengen embassies</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Our Travel Insurance Plan is accepted by every Schengen member state visa office.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {schengenCountries.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-xs font-medium text-primary"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Plus accepted at Non-Schengen embassies including UK, US, Canada, UAE and more.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Visa-free intro */}
    <section className="bg-gradient-hero py-14 sm:py-20 md:py-28">
      <div className="container-tight text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
          <Globe2 className="h-3 w-3 text-accent" />
          By Quantum Travels · 5 min read
        </span>
        <h2 className="mt-5 font-display text-3xl font-medium leading-tight text-primary md:text-5xl">
          Unlocking the world: top visa-free destinations for Nigerian passport holders.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          For Nigerian passport holders with a thirst for global exploration, the good news is that there are several
          enticing destinations that welcome you with open arms — without the hassle of a visa application. Pack your
          bags and discover the world with these top visa-free destinations.
        </p>
      </div>
    </section>

    {/* Destinations */}
    <section className="py-14 sm:py-20 md:py-28">
      <div className="container-wide space-y-10 sm:space-y-14">
        {destinations.map((d, i) => (
          <motion.article
            key={d.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`grid gap-6 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft md:grid-cols-2 md:gap-0 ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary md:aspect-auto md:min-h-[320px]">
              <img
                src={d.image}
                alt={`${d.name} — ${d.tagline}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-12">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
                  <Plane className="h-3 w-3" /> Visa-free
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium text-primary md:text-3xl">
                  {d.name} <span className="text-accent">— {d.tagline}</span>
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{d.body}</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  onClick={() => openQuick(d)}
                  className="w-full rounded-full sm:w-auto"
                >
                  Book {d.name} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                  <a
                    href={buildWaUrl(d.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chat on WhatsApp about ${d.name}`}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    {/* Closing inspirational note */}
    <section className="py-12 sm:py-16">
      <div className="container-tight rounded-3xl border border-border/70 bg-card p-8 text-center shadow-soft md:p-12">
        <p className="font-display text-xl italic text-primary md:text-2xl">
          “Traveling is not just about visiting places; it's about embracing the journey, immersing yourself in new
          cultures, and collecting memories that last a lifetime.”
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          As a Nigerian passport holder, these visa-free destinations open the door to diverse cultures, stunning
          landscapes and unforgettable experiences. Ready your passport — let the exploration begin.
        </p>
      </div>
    </section>

    {/* Strong CTA */}
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center sm:px-10 md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <span className="eyebrow text-accent">Ready to travel?</span>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-primary-foreground sm:text-4xl md:text-5xl">
            Your next great trip starts with one message.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
            Book a curated package, design something custom, or just say hello on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="w-full rounded-full px-7 sm:w-auto">
              <Link to="/packages">
                <Check className="mr-2 h-4 w-4" /> Book a package
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
            >
              <Link to="/contact">Plan a custom trip</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-[#25D366] px-7 text-white hover:bg-[#1ebd5b] sm:w-auto"
            >
              <a
                href={buildWaUrl("a custom trip")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    <DestinationQuickView
      destination={quickDest}
      open={quickOpen}
      onOpenChange={setQuickOpen}
    />
  </>
  );
};

export default About;
