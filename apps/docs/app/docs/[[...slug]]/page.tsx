
import * as Preview from '@/components/preview';
import { Feedback } from '@/components/feedback/client';
import { onPageFeedbackAction } from '@/lib/github';
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation'
import { DocsBody, DocsPage, PageLastUpdate } from 'xyzdocs-ui/layouts/docs/page';
import { ReactNode } from 'react';

function PreviewRenderer({ preview }: { preview: string }): ReactNode {
  if (preview && preview in Preview) {
    const Comp = Preview[preview as keyof typeof Preview];
    return <Comp />;
  }

  return null;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return notFound();
  }
  const { body: Mdx, toc, lastModified } = await page.data;
  console.log('page.data:', JSON.stringify(page.data, null, 2));
  // const { body: Mdx, toc, lastModified } = await page.data.load();
  console.log('rendering page toc', toc);
  // const doc = page.data
  // const MDX = doc.body
  return (
    <DocsPage
      toc={toc}
      tableOfContent={{
        style: 'clerk',
        footer: (
          <div className="my-3 space-y-3">
            {/* <AskAI href={page.url} />
            <OpenInChat href={page.url} /> */}
          </div>
        ),
      }}
    >
      <h1 className="text-[1.75em] font-semibold">{page.data.title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-2">{page.data.description}</p>

      <DocsBody>
        <div className="prose flex-1 text-fd-foreground/90">
          {page.data.preview && <PreviewRenderer preview={page.data.preview} />}
          <Mdx
            components={getMDXComponents({
              components: {},
            })}
          />
        </div>
        <Feedback onSendAction={onPageFeedbackAction} />
        {lastModified && <PageLastUpdate date={lastModified} />}
      </DocsBody>
    </DocsPage>
  );
}


export function generateStaticParams() {
  return source.generateParams();
}
