import { CodeBlock } from 'xyzdocs-ui/components/codeblock';

import { ServerCodeBlock } from 'xyzdocs-ui/components/codeblock.rsc';
import { cn } from '@/lib/cn';
import { title } from 'node:process';
import { LuDatabase } from 'react-icons/lu';

import { TextAlignStartIcon } from 'lucide-react';
import Test from './test';
import { CodeBlockSource } from '@/components/codeblock/codeblockwithsource';
import { DynamicCodeBlock } from 'xyzdocs-ui/components/dynamic-codeblock';

export default function Page() {
  let code = `import createMDX from 'xyzdocs-mdx/config';
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true, 
}; `;
  return (
    <>
      <div className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to xyzdocs!</h1>
      </div>
      {/* <DynamicCodeBlock lang="ts" code={code} /> */}
      <CodeBlockSource
        code={code}
        title="Next.js Configuration"
        lang="ts"
        codeblock={{
          'data-line-numbers': true,
          icon: <TextAlignStartIcon />,
          // run: true,
        }}
        src="/code_snippets/next.config.js"
      />
    </>
  );
}
