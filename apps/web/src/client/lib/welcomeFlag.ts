/**
 * First-run welcome screen flag.
 *
 * Persisted in localStorage so the branded welcome screen is shown once on the
 * first launch and skipped on every subsequent launch (the user lands on Home).
 * Kept intentionally tiny and self-contained — nothing else in the app depends
 * on this, so the whole welcome feature can be removed by deleting its files.
 */
const WELCOME_SEEN_KEY = 'nadia.welcomeSeen';

/** True once the user has seen (and dismissed) the welcome screen. */
export function hasSeenWelcome(): boolean {
  if (typeof window === 'undefined') {
    return true; // SSR / non-browser: never gate
  }
  try {
    return window.localStorage.getItem(WELCOME_SEEN_KEY) === '1';
  } catch {
    return true; // localStorage unavailable: fail open, go straight to Home
  }
}

/** Mark the welcome screen as seen so it is not shown again. */
export function markWelcomeSeen(): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(WELCOME_SEEN_KEY, '1');
  } catch {
    /* ignore: not fatal if we can't persist */
  }
}
