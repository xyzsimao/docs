
import * as Preview from '@/components/preview';
import { Feedback } from '@/components/feedback/client';
import { onPageFeedbackAction } from '@/lib/github';
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation'
import { DocsBody, DocsPage, PageLastUpdate } from 'xyzdocs-ui/layouts/docs/page';
import { ReactNode } from 'react';
import { findSiblings } from 'xyzdocs-core/page-tree';
import { Card, Cards } from 'xyzdocs-ui/components/card';
import { createMetadata, getPageImage } from '@/lib/metadata';
import { Metadata } from 'next';

function PreviewRenderer({ preview }: { preview: string }): ReactNode {
  if (preview && preview in Preview) {
    const Comp = Preview[preview as keyof typeof Preview];
    return <Comp />;
  }

  return null;
}

function DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {findSiblings(source.getPageTree(), url).map((item) => {
        if (item.type === 'separator') return;
        if (item.type === 'folder') {
          if (!item.index) return;
          item = item.index;
        }

        return (
          <Card key={item.url} title={item.name} href={item.url}>
            {item.description}
          </Card>
        );
      })}
    </Cards>
  );
}


export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return notFound();
  }
  const { body: Mdx, toc, lastModified } = await page.data;
  // console.log('page.data:', JSON.stringify(page.data, null, 2));
  // const { body: Mdx, toc, lastModified } = await page.data.load();
  // console.log('page.url:', page.url);
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
              DocsCategory: ({ url }) => {
                return <DocsCategory url={url ?? page.url} />;
              },
            })}
          />
          {page.data.index ? <DocsCategory url={page.url} /> : null}
        </div>
        <Feedback onSendAction={onPageFeedbackAction} />
        {lastModified && <PageLastUpdate date={lastModified} />}
      </DocsBody>
    </DocsPage>
  );
}


export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const { slug = [] } = await props.params;
  const page = source.getPage(slug);
  if (!page)
    return createMetadata({
      title: 'Not Found',
    });

  const description = page.data.description ?? 'The library for building documentation sites';

  const image = {
    url: getPageImage(page).url,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}