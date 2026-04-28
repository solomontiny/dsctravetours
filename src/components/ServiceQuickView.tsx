import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { site } from "@/lib/site";

export type ServiceDetail = {
  title: string;
  text: string;
  icon: LucideIcon;
  bullets?: string[];
};

type Props = {
  service: ServiceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const buildServiceMessage = (title: string) =>
  [
    `Hello ${site.name},`,
    "",
    `I'd like more information about your "${title}" service.`,
    "Please share details, pricing and next steps.",
  ].join("\n");

const ServiceQuickView = ({ service, open, onOpenChange }: Props) => {
  if (!service) return null;
  const Icon = service.icon;
  const waHref = buildWhatsAppUrl(buildServiceMessage(service.title));
  const bullets = service.bullets ?? [
    "Personal travel consultant",
    "Transparent pricing — no hidden fees",
    "WhatsApp & phone support",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-lg overflow-y-auto p-0 sm:w-full">
        <div className="bg-gradient-hero p-6 sm:p-8">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-background/90 text-primary shadow-soft">
            <Icon className="h-5 w-5" />
          </div>
          <DialogHeader className="mt-4 space-y-2 text-left">
            <DialogTitle className="font-display text-2xl font-medium text-primary sm:text-3xl">
              {service.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {service.text}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8">
          <h4 className="font-display text-base font-medium text-primary">What's included</h4>
          <ul className="mt-3 grid gap-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-soft text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild className="rounded-full sm:flex-1">
              <Link to="/contact" onClick={() => onOpenChange(false)}>
                Request this service <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full sm:flex-1">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceQuickView;
