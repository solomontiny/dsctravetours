-- Favorites table for saved destinations/packages
CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  package_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, package_slug)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own favorites"
ON public.favorites FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users add own favorites"
ON public.favorites FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND char_length(package_slug) BETWEEN 1 AND 200);

CREATE POLICY "Users delete own favorites"
ON public.favorites FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_favorites_user ON public.favorites(user_id);