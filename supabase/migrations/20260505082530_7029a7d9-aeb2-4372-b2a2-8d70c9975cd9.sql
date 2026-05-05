
-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add user_id + package_slug + price to bookings
ALTER TABLE public.bookings
  ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN package_slug text,
  ADD COLUMN price_ngn bigint;

-- Allow status: new, confirmed, cancelled, completed
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

-- Update INSERT policy to allow logged-in users to insert their own + status flexibility
DROP POLICY IF EXISTS "Anyone can submit a valid booking" ON public.bookings;
CREATE POLICY "Anyone can submit a booking" ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(destination) BETWEEN 1 AND 200
  AND (message IS NULL OR char_length(message) <= 2000)
  AND (email IS NULL OR char_length(email) <= 320)
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND travelers BETWEEN 1 AND 50
  AND source = ANY (ARRAY['website','tour-details','contact'])
  AND status IN ('new','pending')
  AND (user_id IS NULL OR user_id = auth.uid())
);

CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT
TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE
TO authenticated USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid() AND status IN ('new','pending','cancelled'));

-- Reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  package_slug text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are public" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create own review" ON public.reviews FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id AND char_length(COALESCE(body,'')) <= 2000 AND char_length(COALESCE(title,'')) <= 200);
CREATE POLICY "Users can update own review" ON public.reviews FOR UPDATE
TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own review" ON public.reviews FOR DELETE
TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_reviews_pkg ON public.reviews(package_slug);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
