import defaultMdxComponents from 'xyzdocs-ui/mdx';

import type { MDXComponents } from 'mdx/types';

import * as icons from 'lucide-react';
import * as TabsComponents from 'xyzdocs-ui/components/tabs';
import * as FilesComponents from 'xyzdocs-ui/components/files';
import { Accordion, Accordions } from 'xyzdocs-ui/components/accordion';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    ...components,
  } satisfies MDXComponents;
}

declare module 'mdx/types.js' {
  // Augment the MDX types to make it understand React.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type ElementType = React.JSX.ElementType;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
