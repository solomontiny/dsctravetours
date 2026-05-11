import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Source = "website" | "tour-details" | "contact";

const RATE_LIMIT_KEY = "dsc:last-submit";
const RATE_LIMIT_MS = 15_000; // 15s between submissions per browser

/**
 * Lightweight client-side throttle. Backend enforcement is a separate
 * concern (see input-validation in DB CHECK constraints + RLS).
 */
const isRateLimited = () => {
  try {
    const last = Number(localStorage.getItem(RATE_LIMIT_KEY) ?? 0);
    return Date.now() - last < RATE_LIMIT_MS;
  } catch {
    return false;
  }
};

const markSubmitted = () => {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch {
    /* noop */
  }
};

type Payload = {
  name: string;
  destination: string;
  travel_date?: string | null;
  travelers?: number;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source: Source;
  user_id?: string;
  package_slug?: string;
  price_ngn?: number;
};

export const useBookingSubmit = () => {
  const [submitting, setSubmitting] = useState(false);

  const submit = async (payload: Payload): Promise<boolean> => {
    if (isRateLimited()) {
      toast.error("Please wait a few seconds before submitting again.");
      return false;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        name: payload.name,
        destination: payload.destination,
        travel_date: payload.travel_date ?? null,
        travelers: payload.travelers ?? 1,
        email: payload.email ?? null,
        message: payload.message ?? null,
        source: payload.source,
        status: "new",
        user_id: payload.user_id ?? null,
        package_slug: payload.package_slug ?? null,
        price_ngn: payload.price_ngn ?? null,
      });

      if (error) {
        console.error("Booking insert error:", error.message);
        toast.error("Couldn't save your request. Please try again.");
        return false;
      }

      markSubmitted();
      return true;
    } catch (err) {
      console.error("Booking exception:", err instanceof Error ? err.message : err);
      toast.error("Something went wrong. Please try again.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting };
};
