"use client";

import { Moon, Sun } from "@/components/Icons";

export default function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="btn-icon relative h-10 w-10 overflow-hidden"
    >
      {/* Both icons stay mounted; the dark variant slides one out and the other
          in, which keeps the swap silent for assistive tech. */}
      <Sun className="absolute inset-0 m-auto h-4 w-4 transition-all duration-500 ease-out dark:-translate-y-6 dark:rotate-90 dark:opacity-0" />
      <Moon className="absolute inset-0 m-auto h-4 w-4 translate-y-6 -rotate-90 opacity-0 transition-all duration-500 ease-out dark:translate-y-0 dark:rotate-0 dark:opacity-100" />
    </button>
  );
}
