import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const KEY = "dsc-favorites";

const readLocal = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

const writeLocal = (slugs: string[]) =>
  localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(slugs))));

export const useFavorites = () => {
  const { user } = useAuth();
  const [slugs, setSlugs] = useState<string[]>(() => readLocal());
  const [loading, setLoading] = useState(false);

  // On login: sync local -> DB, then fetch DB -> state
  useEffect(() => {
    let active = true;
    const sync = async () => {
      if (!user) {
        setSlugs(readLocal());
        return;
      }
      setLoading(true);
      const local = readLocal();
      if (local.length) {
        await supabase
          .from("favorites")
          .upsert(
            local.map((s) => ({ user_id: user.id, package_slug: s })),
            { onConflict: "user_id,package_slug", ignoreDuplicates: true },
          );
      }
      const { data } = await supabase
        .from("favorites")
        .select("package_slug")
        .eq("user_id", user.id);
      if (!active) return;
      const next = (data ?? []).map((r) => r.package_slug);
      setSlugs(next);
      writeLocal(next);
      setLoading(false);
    };
    sync();
    return () => {
      active = false;
    };
  }, [user]);

  const isFavorite = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback(
    async (slug: string) => {
      const next = slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug];
      setSlugs(next);
      writeLocal(next);
      if (!user) return;
      if (slugs.includes(slug)) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("package_slug", slug);
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, package_slug: slug });
      }
    },
    [slugs, user],
  );

  return { slugs, isFavorite, toggle, loading };
};
