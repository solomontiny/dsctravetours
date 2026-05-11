import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Eye, Heart } from "lucide-react";
import type { TourPackage } from "@/lib/packages";
import { formatNGN } from "@/lib/currency";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
    >
      <Link to={`/packages/${pkg.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3]">
          <img
            src={pkg.image}
            alt={`${pkg.title} — ${pkg.country}`}
            loading="lazy"
            decoding="async"
            width={1280}
            height={896}
            className="h-full w-full object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-overlay" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
            {pkg.category}
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[11px] font-medium text-primary backdrop-blur sm:right-4 sm:top-4 sm:px-2.5 sm:text-xs">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {pkg.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="truncate">{pkg.destination}, {pkg.country}</span>
          </div>
          <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-primary sm:mt-2 sm:text-xl">
            {pkg.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
            {pkg.summary}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-border/60 pt-3 sm:mt-5 sm:pt-4">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{pkg.duration}</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="font-display text-base font-semibold text-primary sm:text-lg">
                {formatNGN(pkg.price)}
              </div>
            </div>
          </div>

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(pkg);
              }}
              aria-label={`Quick view ${pkg.title}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:hidden"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick view
            </button>
          )}
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
          className="absolute right-4 top-[calc(33%-1.25rem)] hidden items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-primary opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:bg-background group-hover:opacity-100 group-focus-within:opacity-100 sm:inline-flex"
        >
          <Eye className="h-3.5 w-3.5 text-accent" />
          Quick view
        </button>
      )}
    </motion.article>
  );
};

export default PackageCard;
