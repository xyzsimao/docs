

import { source } from '@/lib/source'
import { notFound } from 'next/navigation'
import { DocsBody, DocsPage } from 'xyzdocs-ui/layouts/docs/page';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return notFound();
  }
  const { body: Mdx, toc } = await page.data;
  console.log('rendering page toc', toc);
  // const doc = page.data
  // const MDX = doc.body
  return (
    <DocsPage toc={toc}>
      <h1 className="text-[1.75em] font-semibold">{page.data.title}</h1>
      <p className="text-lg   mb-2">{page.data.description}</p>

      <DocsBody>
        <Mdx />
      </DocsBody>
    </DocsPage>
  );
}