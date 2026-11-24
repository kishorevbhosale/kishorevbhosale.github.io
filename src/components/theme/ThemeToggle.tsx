"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  /** Light-on-dark chrome (e.g. top bar, navy header strip) */
  variant?: "default" | "on-dark";
  className?: string;
};

export function ThemeToggle({ variant = "default", className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const nextMode = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  const shell =
    variant === "on-dark"
      ? "border-white/20 bg-white/10 text-white shadow-none backdrop-blur-sm hover:bg-white/15"
      : "border-border bg-card text-heading shadow-sm hover:bg-surface-subtle";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextMode)}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${shell} ${className}`}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}