import defaultMdxComponents from 'xyzdocs-ui/mdx';

import type { MDXComponents } from 'mdx/types';

import * as icons from 'lucide-react';
import * as TabsComponents from 'xyzdocs-ui/components/tabs';
import * as FilesComponents from 'xyzdocs-ui/components/files';
import { Accordion, Accordions } from 'xyzdocs-ui/components/accordion';
import { Mermaid } from '@/components/mdx/mermaid';
import * as Twoslash from 'xyzdocs-twoslash/ui';
import { ImageZoom } from 'xyzdocs-ui/components/image-zoom';
import { Installation } from './components/preview/installation';
import { Step, Steps } from 'xyzdocs-ui/components/steps';
import { Customisation } from './components/preview/customisation';
// import { Mermaid } from './components/mdx/mermaid';
// you may use environment variable here
const isPrinting = false;
function PrintingAccordion(props: React.ComponentProps<typeof Accordion>) {
  return (
    <div>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}
function PrintingAccordions(props: React.ComponentProps<typeof Accordions>) {
  return <div>{props.children}</div>;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion: isPrinting ? PrintingAccordion : Accordion,
    Accordions: isPrinting ? PrintingAccordions : Accordions,
    // MermaidDiagram,
    Mermaid,
    ...Twoslash,
    img: (props) => <ImageZoom {...(props as any)} />,
    Installation,
    Steps,
    Step,
    Customisation,
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
