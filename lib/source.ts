import { createElement } from 'react';
import { llms, loader } from 'fumadocs-core/source';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';
import { VisunoIcon } from '@visuno/icon/VisunoIcon';

// Component pages carry a `since` in their frontmatter: the unified library
// version the component first shipped in (e.g. "0.3.0"). It renders as the
// "Since v…" badge under the page title. Adding it is part of shipping a
// component's docs — see the `component-docs` skill in the dev root repo.
const componentPageSchema = pageSchema.extend({
  since: z.string().optional(),
});

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: componentPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Render a sidebar `icon` (set in a page's frontmatter or a folder's meta.json)
// with Visuno's own icon component, so nav icons match the library's icon set.
// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  icon(name) {
    if (!name) return;
    return createElement(VisunoIcon, { name, size: 'm' });
  },
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
