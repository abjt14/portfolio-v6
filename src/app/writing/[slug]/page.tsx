import { allArticles } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import MDX from '@/components/writing/MDX';

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default function Article({ params } : { params: { slug: string } }) {
  const article = allArticles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-8 sm:py-[6.05rem] text-neutral-400">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-neutral-50 font-kaiseiTokumin">{article.title}</h1>
        <div className="flex gap-2 justify-start items-baseline text-sm text-neutral-500">
          <p>{format(new Date(article.publishedAt), 'MMMM yyyy')}</p>
          <p>•</p>
          <p>{(article.readingTime > 0 ? article.readingTime.toString() : '1')+ ' min'}</p>
        </div>
      </div>
      <MDX code={article.body.code} />
    </section>
  )
}