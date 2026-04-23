CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  destination TEXT NOT NULL,
  travel_date DATE,
  travelers INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can submit a booking inquiry
CREATE POLICY "Anyone can submit a booking"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (team members) can view bookings
CREATE POLICY "Authenticated users can view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX bookings_created_at_idx ON public.bookings (created_at DESC);