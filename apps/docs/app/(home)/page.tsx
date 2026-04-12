import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/cn';
import { title } from 'node:process';
import { LuDatabase } from 'react-icons/lu';
export default function Page() {
  let code = `import createMDX from 'xyzdocs-mdx/config';
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true, 
}; 
export default withMDX(config);`;
  return (
    <>
      <div className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to xyzdocs!</h1>
      </div>
      <CodeBlock
        lang="js"
        code={code}
        wrapper={{
          'data-line-numbers': true,
          icon: <LuDatabase />,
          title: 'Next.js Configuration',
        }}
      />
    </>
  );
}
