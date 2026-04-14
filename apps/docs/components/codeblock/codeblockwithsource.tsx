import { readFileFromRoot } from '@/utils/read-file';
import { CodeBlock } from 'xyzdocs-ui/components/codeblock';
import { ServerCodeBlock } from 'xyzdocs-ui/components/codeblock.rsc';
import { CodeBlockProps } from 'xyzdocs-ui/components/codeblock';
import React from 'react';

import { defaultIcons as icons, defaultShortcuts } from '@/lib/icons';
import { DynamicCodeBlock } from 'xyzdocs-ui/components/dynamic-codeblock.core';
const getIcon = (lang: string): null | React.ReactNode => {
  if (!lang) return null;

  const iconName = lang in defaultShortcuts ? defaultShortcuts[lang] : lang;
  const icon = iconName in icons ? icons[iconName] : null;

  if (!icon) return null;

  return typeof icon === 'string'
    ? icon
    : `<svg viewBox="${icon.viewBox}"><path d="${icon.d}" fill="${icon.fill}" /></svg>`;
};

export async function CodeBlockSource({
  src,
  lang,
  title,
  code = '',
  codeblock = {},
  ...props
}: React.ComponentProps<'div'> & {
  src?: string;

  lang?: string;
  title?: string;
  code: string;
  codeblock?: CodeBlockProps;
}) {
  if (!src) {
    return <ServerCodeBlock lang="ts" code={code} />;
  }

  let codestr: string | undefined;

  if (src) {
    codestr = await readFileFromRoot(src);
    return <ServerCodeBlock lang="ts"   codeblock={{...codeblock,title: title || '',icon:getIcon(lang|| "js")}}   code={codestr}   />;
  }

  // const code = `console.log("Hello World")`
  // console.log('lang', lang);
  //   code = await formatCode(code, styleName);
  //   code = code.replaceAll('/* eslint-disable react/no-children-prop */\n', '');
}
