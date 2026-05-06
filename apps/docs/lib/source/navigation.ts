export function getSection(path: string | undefined) {
  if (!path) return 'framework';
  const [dir] = path.split('/', 1);
  if (!dir) return 'framework';
  return (
    {
      ui: 'ui',
      mdx: 'mdx',
      cli: 'cli',
      headless: 'headless',
      miscellaneous: 'miscellaneous',
      javascript: 'javascript',
      snippets: 'snippets',
      // design-system: 'designsystem',
    }[dir] ?? 'framework'
  );
}
