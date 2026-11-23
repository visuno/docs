import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Visuno';

/**
 * The single source of truth for the Visuno library version shown in these docs.
 * The three framework packages (react, angular, flutter) and this docs site all
 * move together on one unified version — bump this in lockstep with their
 * package.json / pubspec.yaml when cutting a release, and add a matching
 * `## v<version> — <date>` section to the changelog. Surfaced as the version
 * badge in the nav (see lib/layout.shared.tsx) and links to the changelog.
 */
export const libVersion = '0.3.0';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Visuno GitHub org. The docs repo links back to the components source.
export const gitConfig = {
  user: 'Visuno',
  repo: 'components',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${getContentUrl(segments, page.locale)}` };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${getImageUrl(segments, page.locale)}` };
}
