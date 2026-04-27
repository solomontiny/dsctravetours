import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Eye } from "lucide-react";
import type { TourPackage } from "@/lib/packages";

type Props = {
  pkg: TourPackage;
  index?: number;
  onQuickView?: (pkg: TourPackage) => void;
};

const PackageCard = ({ pkg, index = 0, onQuickView }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
    >
      <Link to={`/packages/${pkg.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={pkg.image}
            alt={`${pkg.title} — ${pkg.country}`}
            loading="lazy"
            width={1280}
            height={896}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-overlay" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
            {pkg.category}
          </span>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-primary backdrop-blur">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {pkg.rating.toFixed(1)}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {pkg.destination}, {pkg.country}
          </div>
          <h3 className="mt-2 font-display text-xl font-medium leading-snug text-primary">
            {pkg.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {pkg.summary}
          </p>

          <div className="mt-5 flex items-end justify-between border-t border-border/60 pt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {pkg.duration}
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="font-display text-lg font-semibold text-primary">
                ${pkg.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {onQuickView && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(pkg);
          }}
          aria-label={`Quick view ${pkg.title}`}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-primary opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:bg-background group-hover:opacity-100 group-focus-within:opacity-100 sm:bottom-4 sm:right-4 max-sm:opacity-100"
        >
          <Eye className="h-3.5 w-3.5 text-accent" />
          Quick view
        </button>
      )}
    </motion.article>
  );
};

export default PackageCard;
