import { z } from "zod";

/**
 * Validation schemas for booking & contact forms.
 * Mirrors the database CHECK constraints on `bookings`.
 */

// Strip control chars / zero-width — basic XSS/injection hardening
const cleanString = (max: number) =>
  z
    .string()
    .trim()
    .transform((s) => s.replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, ""))
    .pipe(z.string().max(max));

export const bookingSchema = z.object({
  name: cleanString(120).pipe(z.string().min(2, "Please enter your full name")),
  destination: cleanString(200).pipe(z.string().min(2, "Where would you like to go?")),
  date: z
    .string()
    .min(1, "Pick a travel date")
    .refine((d) => !Number.isNaN(Date.parse(d)), "Invalid date")
    .refine((d) => new Date(d) >= new Date(new Date().toDateString()), "Date must be today or later"),
  travelers: z.coerce.number().int().min(1).max(50),
});

export const contactSchema = z.object({
  name: cleanString(120).pipe(z.string().min(2, "Please enter your name")),
  email: cleanString(320).pipe(z.string().email("Enter a valid email address")),
  subject: cleanString(200).optional().default(""),
  message: cleanString(2000).pipe(z.string().min(10, "Please share a few details (10+ chars)")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
