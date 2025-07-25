export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';

export const GLOB_JS = '**/*.?([cm])js';
export const GLOB_JSX = '**/*.?([cm])jsx';

export const GLOB_TS = '**/*.?([cm])ts';
export const GLOB_TSX = '**/*.?([cm])tsx';
export const GLOB_DTS = '**/*.d.?([cm])ts';

export const GLOB_VUE = '**/*.vue';
export const GLOB_ASTRO = '**/*.astro';
export const GLOB_ASTRO_TS = '**/*.astro/*.ts';
export const GLOB_SVELTE = '**/*.svelte';

export const GLOB_HTML = '**/*.htm?(l)';

export const GLOB_STYLE = '**/*.{c,le,sc}ss';
export const GLOB_CSS = '**/*.css';
export const GLOB_POSTCSS = '**/*.{p,post}css';
export const GLOB_LESS = '**/*.less';
export const GLOB_SCSS = '**/*.scss';
export const GLOB_SVG = '**/*.svg';

export const GLOB_JSON = '**/*.json';
export const GLOB_JSON5 = '**/*.json5';
export const GLOB_JSONC = '**/*.jsonc';

export const GLOB_MARKDOWN = '**/*.md';
export const GLOB_MARKDOWN_CODE = `${GLOB_MARKDOWN}/${GLOB_SRC}`;
export const GLOB_MARKDOWN_NESTED = '**/*.md/*.md';
export const GLOB_YAML = '**/*.y?(a)ml';
export const GLOB_PNPM_WORKSPACE_YAML = '**/pnpm-workspace.yaml';
export const GLOB_TOML = '**/*.toml';

export const GLOB_PRETTIER_LINT = [GLOB_SRC, GLOB_VUE];

export const GLOB_PACKAGE_JSON = '**/package.json';

export const GLOB_TS_CONFIG = '**/tsconfig.json';
export const GLOB_TS_OTHER_CONFIG = '**/tsconfig.*.json';

export const GLOB_JSON_SCHEMA = ['**/*.schema.json', '**/schemas/*.json'];

export const GLOB_TESTS = [
  `**/__tests__/**/*.${GLOB_SRC_EXT}`,
  `**/*.spec.${GLOB_SRC_EXT}`,
  `**/*.test.${GLOB_SRC_EXT}`,
  `**/*.bench.${GLOB_SRC_EXT}`,
  `**/*.benchmark.${GLOB_SRC_EXT}`,
  `**/*.test-d.${GLOB_SRC_EXT}`,
  `**/*.spec-d.${GLOB_SRC_EXT}`,
];

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',

  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',

  '**/.github/workflows/*.yml',
];

export const GLOB_TYPES = [GLOB_DTS, `**/types/${GLOB_TS}`, `**/types.ts`];
