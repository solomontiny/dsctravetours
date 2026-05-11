import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Mode = Theme | "system";

type Ctx = { theme: Theme; mode: Mode; setMode: (m: Mode) => void; toggle: () => void };

const ThemeContext = createContext<Ctx | undefined>(undefined);
const STORAGE_KEY = "dsc-theme-mode";

const getSystem = (): Theme =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(STORAGE_KEY) as Mode) || "system";
  });
  const [theme, setTheme] = useState<Theme>(() =>
    mode === "system" ? getSystem() : (mode as Theme)
  );

  useEffect(() => {
    const resolved: Theme = mode === "system" ? getSystem() : mode;
    setTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const t = mq.matches ? "dark" : "light";
      setTheme(t);
      document.documentElement.classList.toggle("dark", t === "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const setMode = (m: Mode) => setModeState(m);
  const toggle = () => setModeState(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggle }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme must be used within ThemeProvider");
  return c;
};
