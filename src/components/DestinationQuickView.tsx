import { MessageCircle, Plane } from "lucide-react";
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
  if (!destination) return null;
  const waHref = buildWhatsAppUrl(destinationWhatsAppMessage(destination.name));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-2xl overflow-y-auto p-0 sm:w-full">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-secondary">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
            <Plane className="h-3 w-3 text-accent" /> Visa-free
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-display text-2xl font-medium text-primary sm:text-3xl">
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

          <div className="mt-6">
            <h4 className="font-display text-base font-medium text-primary">
              Reserve {destination.name}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              We've pre-filled your destination — just add your dates and travelers.
            </p>
            <div className="mt-3">
              <BookingForm
                compact
                source="website"
                defaultDestination={destination.name}
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

export default DestinationQuickView;
