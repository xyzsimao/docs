

import { source } from '@/lib/source'
import { notFound } from 'next/navigation'


export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
     return notFound()
  }

  const doc = page.data
  const MDX = doc.body
    return (
      <div>
      <h1 className="text-[1.75em] font-semibold">{doc.title}</h1>
      <p className="text-lg   mb-2">
        {doc.description}
      </p>
      <MDX> </MDX>
      </div>
    )
}