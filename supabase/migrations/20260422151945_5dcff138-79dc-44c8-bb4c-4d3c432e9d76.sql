-- Replace the permissive insert policy with a validated one
DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;

CREATE POLICY "Anyone can submit a valid booking"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(destination) BETWEEN 1 AND 200
    AND (message IS NULL OR char_length(message) <= 2000)
    AND (email IS NULL OR char_length(email) <= 320)
    AND (phone IS NULL OR char_length(phone) <= 40)
    AND travelers BETWEEN 1 AND 50
    AND source IN ('website', 'tour-details', 'contact')
    AND status = 'new'
  );