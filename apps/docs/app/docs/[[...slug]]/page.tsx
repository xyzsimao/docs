

import { source } from '@/lib/source'
import { notFound } from 'next/navigation'
import { DocsPage } from 'xyzdocs-ui/layouts/docs/page';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
     return notFound()
  }

  const doc = page.data
  const MDX = doc.body
    return (
      <DocsPage>
        <h1 className="text-[1.75em] font-semibold">{doc.title}</h1>
        <p className="text-lg   mb-2">{doc.description}</p>
        <MDX> </MDX>
      </DocsPage>
    );
}