import { site } from "@/lib/site";

/**
 * Build a wa.me URL with a pre-filled message body.
 * Single source of truth so every CTA on the site sends the same format.
 */
export const buildWhatsAppUrl = (message: string) => {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
};

/** Generic "I'd like to plan a trip" message — used by the floating button. */
export const generalWhatsAppMessage = () =>
  [
    `Hello ${site.name},`,
    "",
    "I'd like to plan a trip — please share more details and help me with a quote.",
  ].join("\n");

/** Destination-focused inquiry — used by destination cards & visa-free entries. */
export const destinationWhatsAppMessage = (destination: string) =>
  [
    `Hello ${site.name},`,
    "",
    `I'm interested in booking a trip to ${destination}.`,
    "Please share availability, pricing and next steps.",
  ].join("\n");

/** Package-focused inquiry — used on the Quick View popup & package details. */
export const packageWhatsAppMessage = (pkg: {
  title: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
}) =>
  [
    `Hello ${site.name},`,
    "",
    `I'd like to book the "${pkg.title}" package.`,
    `• Destination: ${pkg.destination}, ${pkg.country}`,
    `• Duration: ${pkg.duration}`,
    `• Indicative price: $${pkg.price.toLocaleString()} / person`,
    "",
    "Please confirm availability and send me a full quote.",
  ].join("\n");

/** Booking-confirmation follow-up — used by BookingForm success state. */
export const bookingFollowUpMessage = (form: {
  name: string;
  destination: string;
  date: string;
  travelers: string;
}) =>
  [
    `Hello ${site.name},`,
    "",
    "I just submitted a booking request:",
    `• Name: ${form.name}`,
    `• Destination: ${form.destination}`,
    `• Date: ${form.date}`,
    `• Travelers: ${form.travelers}`,
  ].join("\n");
