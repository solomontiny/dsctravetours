import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, MapPin, Star, ShieldCheck, Calendar, Users } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import BookingForm from "@/components/BookingForm";
import ReviewsSection from "@/components/ReviewsSection";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { packages } from "@/lib/packages";
import { formatNGN } from "@/lib/currency";

const TourDetails = () => {
  const { slug } = useParams();
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    return (
      <section className="container-wide py-32 text-center">
        <Seo title="Trip not found" description="The package you're looking for doesn't exist." />
        <h1 className="font-display text-3xl text-primary">Trip not found</h1>
        <p className="mt-3 text-muted-foreground">The package you're looking for doesn't exist.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/packages"><ArrowLeft className="mr-2 h-4 w-4" /> Back to packages</Link>
        </Button>
      </section>
    );
  }

  const related = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  // Build a small gallery using the package image and other destination images for visual richness.
  const galleryImages = [pkg.image, ...packages.filter((p) => p.slug !== pkg.slug).slice(0, 3).map((p) => p.image)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    image: pkg.image,
    touristType: pkg.category,
    itinerary: pkg.itinerary.map((d) => ({
      "@type": "ItemList",
      name: `Day ${d.day}: ${d.title}`,
      description: d.description,
    })),
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating.toString(),
      reviewCount: "24",
    },
  };

  return (
    <>
      <Seo
        title={pkg.title}
        description={pkg.summary}
        image={pkg.image}
        jsonLd={jsonLd}
      />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="h-full w-full object-cover"
            fetchPriority="high"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-background" />
        </div>

        <div className="container-wide pt-16 pb-20 md:pt-24 md:pb-28">
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All packages
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              {pkg.category}
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <Star className="h-3 w-3 fill-accent text-accent" /> {pkg.rating.toFixed(1)}
            </span>
            <h1 className="mt-4 font-display text-[2.25rem] font-medium leading-[1.05] text-primary-foreground sm:text-4xl md:text-6xl">
              {pkg.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {pkg.destination}, {pkg.country}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {pkg.duration}</span>
              <span className="inline-flex items-center gap-1.5">From <strong className="font-display text-base text-primary-foreground">{formatNGN(pkg.price)}</strong> / person</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="-mt-10 md:-mt-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-2 overflow-hidden rounded-3xl border border-border/60 bg-card p-2 shadow-card md:grid-cols-4"
          >
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-square"}`}
              >
                <img
                  src={src}
                  alt={`${pkg.title} preview ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap gap-3">
              <Badge icon={Calendar} label={pkg.duration} />
              <Badge icon={Users} label="Small groups & private" />
              <Badge icon={ShieldCheck} label="Free cancellation up to 30 days" />
            </div>

            <h2 className="mt-10 font-display text-2xl font-medium text-primary md:text-3xl">Overview</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {pkg.summary}
            </p>

            <h3 className="mt-12 font-display text-xl font-medium text-primary">Trip highlights</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {pkg.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-soft">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground/90">{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-xl font-medium text-primary">Day-by-day itinerary</h3>
            <ol className="mt-5 space-y-4">
              {pkg.itinerary.map((d) => (
                <motion.li
                  key={d.day}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-5 rounded-xl border border-border/60 bg-card p-5 shadow-soft"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
                    <span className="font-display text-sm font-semibold">D{d.day}</span>
                  </div>
                  <div>
                    <div className="font-medium text-primary">{d.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <h3 className="mt-12 font-display text-xl font-medium text-primary">What's included</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {pkg.includes.map((inc) => (
                <span key={inc} className="rounded-full border border-accent/30 bg-accent-soft/40 px-3 py-1.5 text-xs font-medium text-primary">
                  {inc}
                </span>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
                  <div className="font-display text-3xl font-semibold text-primary">
                    {formatNGN(pkg.price)}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">/ person</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-primary">
                  <Star className="h-3 w-3 fill-accent text-accent" /> {pkg.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.duration} · {pkg.destination}</p>
              <div className="mt-5">
                <BookingForm compact source="tour-details" defaultDestination={`${pkg.destination}, ${pkg.country}`} packageSlug={pkg.slug} priceNgn={pkg.price} />
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-accent" />
                Secure inquiry — no payment required to request a quote.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <ReviewsSection packageSlug={pkg.slug} />

      <section className="bg-secondary/40 py-20">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-medium text-primary md:text-3xl">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PackageCard key={p.slug} pkg={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Badge = ({ icon: Icon, label }: { icon: typeof Clock; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-soft">
    <Icon className="h-3.5 w-3.5 text-accent" />
    {label}
  </span>
);

export default TourDetails;
