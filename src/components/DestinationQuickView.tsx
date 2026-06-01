import { useEffect, useRef, useState } from "react";
import { MessageCircle, Plane, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/BookingForm";
import { buildWhatsAppUrl, destinationWhatsAppMessage } from "@/lib/whatsapp";

export type QuickViewDestination = {
  name: string;
  tagline?: string;
  body?: string;
  image: string;
};

type Props = {
  destination: QuickViewDestination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DestinationQuickView = ({ destination, open, onOpenChange }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const [confirmedAt, setConfirmedAt] = useState(0);

  // Reset scroll position whenever the dialog opens with a new destination
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open, destination?.name]);

  // Smoothly scroll to the booking confirmation when it appears
  useEffect(() => {
    if (!confirmedAt) return;
    const id = window.setTimeout(() => {
      formWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(id);
  }, [confirmedAt]);

  if (!destination) return null;
  const waHref = buildWhatsAppUrl(destinationWhatsAppMessage(destination.name));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-2xl gap-0 overflow-hidden rounded-2xl border-border/60 p-0 sm:w-full"
      >
        <div ref={scrollRef} className="max-h-[92vh] overflow-y-auto overscroll-contain">
          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
            <img
              src={destination.image}
              alt={destination.name}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur sm:left-4 sm:top-4">
              <Plane className="h-3 w-3 text-accent" /> Visa-free
            </span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary shadow-soft backdrop-blur transition-colors hover:bg-background sm:right-4 sm:top-4"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-4 pb-6 pt-5 sm:px-7 sm:pb-8 sm:pt-7">
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="font-display text-2xl font-medium leading-tight text-primary sm:text-3xl">
                {destination.name}
                {destination.tagline && (
                  <span className="text-accent"> — {destination.tagline}</span>
                )}
              </DialogTitle>
              {destination.body && (
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {destination.body}
                </DialogDescription>
              )}
            </DialogHeader>

            <div ref={formWrapRef} className="mt-6 scroll-mt-4">
              <h4 className="font-display text-base font-medium text-primary">
                Reserve {destination.name}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Pre-filled with your destination — add your dates and travelers to confirm.
              </p>
              <div className="mt-3">
                <BookingForm
                  compact
                  source="website"
                  defaultDestination={destination.name}
                  onSuccess={() => setConfirmedAt(Date.now())}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationQuickView;
