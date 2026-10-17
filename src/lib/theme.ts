/** Flips light/dark and remembers the choice; the pre-paint script in the root layout reads it back. */
export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // Storage can be blocked (private mode); the toggle still works for this visit.
  }
}
