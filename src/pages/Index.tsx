import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Plane,
  ShieldCheck,
  Hotel,
  FileCheck2,
  Car,
  Briefcase,
  Award,
  HeartHandshake,
  Users,
  Globe2,
  BadgeCheck,
} from "lucide-react";
import hero from "@/assets/hero-main.jpg";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BookingForm from "@/components/BookingForm";
import SectionHeader from "@/components/SectionHeader";
import PackageCard from "@/components/PackageCard";
import PackageQuickView from "@/components/PackageQuickView";
import ServiceQuickView, { type ServiceDetail } from "@/components/ServiceQuickView";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Seo from "@/components/Seo";
import { packages, featuredSlugs, type TourPackage } from "@/lib/packages";
import { site } from "@/lib/site";

const services: ServiceDetail[] = [
  { icon: Plane, title: "Flight Booking", text: "Domestic and international flights with priority fares.", bullets: ["Economy to business class", "Best-fare GDS search", "24/7 reschedule help"] },
  { icon: FileCheck2, title: "Visa Processing", text: "End-to-end visa support with high success rate.", bullets: ["Schengen, UK, US, Canada, UAE", "Document review", "98% approval rate"] },
  { icon: Hotel, title: "Hotel Reservation", text: "Hand-picked stays — boutique to five-star.", bullets: ["Negotiated chain rates", "Boutique specialists", "Free cancellation options"] },
  { icon: ShieldCheck, title: "Travel Insurance", text: "Peace of mind for every trip, every traveler.", bullets: ["Medical & evacuation", "Baggage & delay cover", "Schengen-compliant"] },
  { icon: Car, title: "Airport Pickup", text: "Discreet, on-time chauffeur service door-to-door.", bullets: ["Meet & greet", "Executive sedans/SUVs", "Flight tracking"] },
  { icon: Briefcase, title: "Protocol Service", text: "VIP handling and fast-track at major airports.", bullets: ["Lounge & fast-track", "Baggage assistance", "Lagos, Abuja, London, Dubai"] },
];

const trustStats = [
  { k: "500+", v: "Happy travelers" },
  { k: "30+", v: "Destinations" },
  { k: "98%", v: "Visa success" },
  { k: "15+", v: "Years experience" },
];

const testimonials = [
  {
    name: "Tunde Ade",
    role: "Honeymoon — Maldives",
    quote:
      "Every detail was thought of. Our overwater villa, the seaplane, the dinners — flawless. We just had to show up.",
  },
  {
    name: "Ngozi A.",
    role: "Family Trip — Dubai",
    quote:
      "DSC made traveling with three kids feel effortless. Fast visa, easy transfers and a beautiful hotel.",
  },
  {
    name: "Ibrahim O.",
    role: "Corporate — London",
    quote:
      "Reliable, professional and quick to respond. They've handled five corporate trips for us this year.",
  },
];

const faqs = [
  {
    q: "How do I book a tour with DSC?",
    a: "Pick a package, fill the booking form (or message us on WhatsApp), and a planner replies within 24 hours with a tailored quote. We confirm once you approve the itinerary and pay a deposit.",
  },
  {
    q: "Can you customize an itinerary just for me?",
    a: "Absolutely — every trip is shaped around your dates, budget and travel style. Tell us what you have in mind and we'll design something private.",
  },
  {
    q: "Do you handle visas and travel insurance?",
    a: "Yes. We process visas end-to-end (98% success rate) and arrange travel insurance with trusted underwriters for every traveler.",
  },
  {
    q: "What's included in a package price?",
    a: "Most packages include flights, hotels, airport transfers, daily breakfast and guided tours. Each listing shows exactly what's included so there are no surprises.",
  },
  {
    q: "Are payment plans available?",
    a: "Yes — flexible installments are available on most packages. Speak to your planner about a plan that works for you.",
  },
];

const Index = () => {
  const [quickViewPkg, setQuickViewPkg] = useState<TourPackage | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const openQuickView = (pkg: TourPackage) => {
    setQuickViewPkg(pkg);
    setQuickViewOpen(true);
  };

  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const openService = (s: ServiceDetail) => {
    setActiveService(s);
    setServiceOpen(true);
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: "https://dsctravelstours.com",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title="Travel Beyond Ordinary"
        description="DSC Travels & Tours — premium flight booking, visa processing, hotel reservations and curated tour packages from Lagos, Nigeria."
        jsonLd={[orgJsonLd, faqJsonLd]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={hero}
            alt="Tropical beach at sunrise"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
          <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        </div>

        <div className="container-wide pt-16 pb-24 md:pt-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary backdrop-blur-md">
              <Award className="h-3 w-3 text-accent" />
              Premium travel · Since 2010
            </span>
            <h1 className="mt-5 font-display text-[2.5rem] font-medium leading-[1.05] text-primary sm:text-5xl md:text-7xl lg:text-[5.25rem]">
              Travel beyond <em className="font-display italic text-accent">ordinary</em>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl md:mt-6">
              Curated journeys from Lagos to the world. Flights, visas, hotels and tours —
              handled with quiet excellence by DSC Travels & Tours.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
              <Button asChild size="lg" className="w-full rounded-full px-7 shadow-elevated sm:w-auto">
                <Link to="/packages">Explore packages <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full rounded-full bg-card/70 px-7 backdrop-blur-md sm:w-auto">
                <Link to="/contact">Talk to a planner</Link>
              </Button>
            </div>
          </motion.div>

          <div className="mt-14 md:mt-20">
            <BookingForm />
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 backdrop-blur md:grid-cols-4"
          >
            {trustStats.map((s) => (
              <div key={s.v} className="flex items-center justify-center gap-3 bg-card/85 px-6 py-5 text-center backdrop-blur">
                <div className="font-display text-2xl font-semibold text-primary md:text-3xl">
                  {s.k}
                  {s.icon && <s.icon className="ml-1 inline h-4 w-4 fill-accent text-accent" />}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            eyebrow="What we do"
            title="Travel, handled end-to-end"
            description="From the first idea to your return flight — one team, every detail covered."
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.button
                type="button"
                key={s.title}
                onClick={() => openService(s)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex flex-col gap-4 bg-card p-8 text-left transition-colors hover:bg-accent-soft/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-primary transition-transform group-hover:-translate-y-0.5">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-medium text-primary">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-accent opacity-80">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/services">See all services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured packages (current promos) */}
      <section className="bg-gradient-hero py-16 sm:py-20 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              align="left"
              eyebrow="Featured offers"
              title="This season's headline trips"
              description="Cruises and curated escapes our planners are booking right now — limited dates, locked-in rates."
              className="md:max-w-xl"
            />
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/packages">All packages <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages
              .filter((p) => featuredSlugs.includes(p.slug))
              .map((p, i) => (
                <PackageCard key={p.slug} pkg={p} index={i} onQuickView={openQuickView} />
              ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-secondary/40 py-16 sm:py-20 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              align="left"
              eyebrow="Destinations"
              title="Where will you go next?"
              description="Curated escapes loved by our travelers — and ready to book."
              className="md:max-w-xl"
            />
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/packages">View all packages <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.filter((p) => !featuredSlugs.includes(p.slug)).slice(0, 6).map((p, i) => (
              <PackageCard key={p.slug} pkg={p} index={i} onQuickView={openQuickView} />
            ))}
          </div>
        </div>
      </section>

      {/* Why DSC */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Why DSC"
            title="Quiet excellence, every trip"
            description="The little things — done right. The big things — handled before you ask."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: HeartHandshake, title: "One dedicated planner", text: "A real human, on WhatsApp, from quote to return flight." },
              { icon: Award, title: "Vetted partners only", text: "Hotels, guides and transfers we have personally tested." },
              { icon: ShieldCheck, title: "No-surprise pricing", text: "Clear quotes, no hidden fees, easy installments available." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border/70 bg-card p-8 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-16 sm:py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Travelers' stories"
            title="Quietly unforgettable trips"
          />
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-28">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Good to know"
            title="Frequently asked questions"
            description="Everything you need to know before you reach out."
          />
          <Accordion type="single" collapsible className="mt-12 w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border-b border-border/70"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg font-medium text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 py-16 text-center md:px-16 md:py-24"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <span className="eyebrow text-accent">Ready when you are</span>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-primary-foreground md:text-5xl">
              Let's plan your next great trip.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
              Tell us where and when — we'll come back with a thoughtful plan within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
                <Link to="/contact">Start planning</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/packages">Browse packages</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PackageQuickView
        pkg={quickViewPkg}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
      <ServiceQuickView
        service={activeService}
        open={serviceOpen}
        onOpenChange={setServiceOpen}
      />
    </>
  );
};

export default Index;
