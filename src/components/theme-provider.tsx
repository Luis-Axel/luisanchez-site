"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "lui-theme";

/* ---------- External store: localStorage + system fallback ---------- */

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function readTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function writeTheme(t: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, t);
  } catch {}
  emit();
}

/* ---------- Provider ---------- */

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Stable SSR snapshot: always "light" on the server, then resolved on client
  const theme = React.useSyncExternalStore<Theme>(
    subscribe,
    readTheme,
    () => "light",
  );

  // Apply the resolved theme to <html data-theme>; this is a legitimate
  // sync-with-DOM effect (no setState).
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [theme]);

  const setTheme = React.useCallback((t: Theme) => writeTheme(t), []);
  const toggle = React.useCallback(
    () => writeTheme(readTheme() === "dark" ? "light" : "dark"),
    [],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "light" as const,
      toggle: () => {},
      setTheme: () => {},
    };
  }
  return ctx;
}
