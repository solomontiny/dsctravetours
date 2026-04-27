import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, MapPin, MessageCircle, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/BookingForm";
import { buildWhatsAppUrl, packageWhatsAppMessage } from "@/lib/whatsapp";
import type { TourPackage } from "@/lib/packages";

type Props = {
  pkg: TourPackage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PackageQuickView = ({ pkg, open, onOpenChange }: Props) => {
  if (!pkg) return null;

  const waHref = buildWhatsAppUrl(packageWhatsAppMessage(pkg));
  const destinationLabel = `${pkg.destination}, ${pkg.country}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto p-0 sm:w-full">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-secondary">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              {pkg.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <Star className="h-3 w-3 fill-accent text-accent" />
              {pkg.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-accent" /> {destinationLabel}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {pkg.duration}
              </span>
            </div>
            <DialogTitle className="font-display text-2xl font-medium text-primary sm:text-3xl">
              {pkg.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {pkg.summary}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 flex items-baseline justify-between rounded-xl border border-border/70 bg-secondary/40 p-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="font-display text-2xl font-semibold text-primary">
                ${pkg.price.toLocaleString()}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to={`/packages/${pkg.slug}`} onClick={() => onOpenChange(false)}>
                Full details <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {pkg.highlights?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-display text-base font-medium text-primary">Trip highlights</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {pkg.highlights.slice(0, 6).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-soft text-primary">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-display text-base font-medium text-primary">
              Reserve {pkg.destination}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              We've pre-filled your destination — just add your dates and travelers.
            </p>
            <div className="mt-3">
              <BookingForm
                compact
                source="tour-details"
                defaultDestination={destinationLabel}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Prefer to chat? Get an instant reply on WhatsApp.
            </p>
            <Button
              asChild
              className="w-full rounded-full bg-[#25D366] text-white hover:bg-[#1ebd5b] sm:w-auto"
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageQuickView;
