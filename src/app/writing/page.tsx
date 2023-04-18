import styles from '@/styles/Writing.module.css';
import { allArticles } from 'contentlayer/generated';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts, ideas, and stories from my journey as a developer.',
};

const CrypticTextDynamic = dynamic(() => import('@/components/writing/CrypticText'), {
  ssr: false,
});

export default function Writing() {
  return (
    <section className="sm:pt-[12.05rem] flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-1">
      <div className="flex-1 flex flex-col gap-5">
        {
          allArticles
          .sort((a, b) => a.publishedAt > b.publishedAt ? -1 : 1)
          .map((article, index) => (
            <div
              key={article._id}
              className={clsx(
                "flex flex-col gap-[.125rem]",
                styles.fadein
              )}
              style={{
                animationDelay: `calc(var(--animation-delay-writing) + ${index * .1}s)`
              }}
            >
              <Link href={`/writing/${article.slug}`} className="text-neutral-50">
                <CrypticTextDynamic text={article.title} />
              </Link>
              <div className="flex gap-1 justify-start items-baseline text-sm text-neutral-600">
                <CrypticTextDynamic text={format(new Date(article.publishedAt), 'MMMM yyyy')} />
                <CrypticTextDynamic text='•' />
                <CrypticTextDynamic text={
                  (article.readingTime > 0 ? article.readingTime.toString() : '1')
                  + ' min'
                } />
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}
