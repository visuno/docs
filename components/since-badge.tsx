import Link from 'next/link';
import { docsRoute, libVersion } from '@/lib/shared';

/**
 * "Since v…" badge shown under a component docs page's title: the unified library
 * version the component first shipped in, read from the page's `since`
 * frontmatter. When `since` equals the current library version the component is
 * new in this release, so the badge reads "New in v…" and takes the accent.
 * Links to the changelog. Every component docs page should set `since` — see the
 * `component-docs` skill in the dev root repo.
 */
export function SinceBadge({ since }: { since?: string }) {
  if (!since) return null;
  const isNew = since === libVersion;
  return (
    <Link
      href={`${docsRoute}/changelog`}
      aria-label={`${isNew ? 'New in' : 'Available since'} Visuno version ${since} — view changelog`}
      className={[
        'not-prose mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5',
        'font-mono text-[11px] font-medium leading-none no-underline transition-colors',
        isNew
          ? 'border-fd-primary/30 bg-fd-primary/10 text-fd-primary hover:bg-fd-primary/15'
          : 'border-fd-border bg-fd-secondary/50 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
      ].join(' ')}
    >
      <span className="opacity-70">{isNew ? 'New in' : 'Since'}</span>
      v{since}
    </Link>
  );
}
