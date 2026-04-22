"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // resolvedTheme is undefined during SSR and the first client render, so
  // both sides render the Moon and switch to Sun only after the provider
  // reads the stored preference — no hydration mismatch.
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className={`size-5 ${isDark ? "inline" : "hidden"}`} />
      <Moon className={`size-5 ${isDark ? "hidden" : "inline"}`} />
    </Button>
  );
}
