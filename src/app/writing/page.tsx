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
    <section className="sm:pt-[12.05rem] flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-1 sm:basis-3/4">
      <div className="flex-1 flex flex-col gap-5">
        {
          allArticles
          .sort((a, b) => a.publishedAt > b.publishedAt ? -1 : 1)
          .map((article, index) => (
            <div
              key={article._id}
              className={clsx(
                "flex flex-col gap-[.125rem] group",
              )}
            >
              <Link href={`/writing/${article.slug}`} className="text-neutral-50">
                <div className="flex gap-2 items-center justify-start">
                  <CrypticTextDynamic
                    text={article.title}
                    delay={index * .1}
                    classNames={styles.fadein}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 hidden sm:block text-transparent -translate-x-1 group-hover:text-current group-hover:-translate-x-0 transition-all duration-150 will-change-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div className="flex gap-1 justify-start items-baseline text-sm text-neutral-600">
                  <CrypticTextDynamic
                    text={format(new Date(article.publishedAt), 'MMMM yyyy')}
                    delay={index * .1}
                    classNames={styles.fadein}
                  />
                  <CrypticTextDynamic
                    text='•'
                    delay={index * .1}
                    classNames={styles.fadein}
                  />
                  <CrypticTextDynamic
                    text={(article.readingTime > 0 ? article.readingTime.toString() : '1')+ ' min'}
                    delay={index * .1}
                    classNames={styles.fadein}
                  />
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  )
}
