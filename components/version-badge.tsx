import { libVersion } from '@/lib/shared';

/**
 * A small pill in the nav, next to the wordmark, showing the unified Visuno
 * library version these docs describe. The version comes from the one source of
 * truth (`libVersion` in lib/shared.ts); the three framework packages and the
 * docs all move together on it.
 *
 * Rendered as a plain span, not a link: Fumadocs already wraps the whole nav
 * title in an anchor to the home page, and nesting an <a> inside it is invalid
 * HTML (it caused a hydration mismatch). Readers reach the changelog from the
 * sidebar; this badge just states the version.
 */
export function VersionBadge() {
  return (
    <span
      aria-label={`Visuno version ${libVersion}`}
      className="ml-1 rounded-full border border-fd-border bg-fd-secondary/50 px-2 py-0.5 font-mono text-[11px] font-medium leading-none text-fd-muted-foreground"
    >
      v{libVersion}
    </span>
  );
}
