import styles from "./experiment.module.css";
import ExperimentExport from "@/components/lab/experiments/ExperimentExport";
import { experiments } from "@/data/experiments";
import clsx from "clsx";
import Link from "next/link";
import { Metadata } from "next";

export function generateStaticParams() {
  const data = experiments.map((experiment) => ({
    params: {
      slug: experiment.slug,
    },
  }));

  return data;
}

export async function generateMetadata({ params }: {
  params: Experiment
}): Promise<Metadata | undefined> {
  const experiment = experiments.find((experiment) => experiment.slug === params.slug);

  if (experiment) {
    return {
      title: experiment.name,
      openGraph: {
        title: experiment.name,
        url: `https://abjt.dev/lab/${experiment.slug}`,
        images: [
          {
            url: `https://abjt.dev/lab/videos/lab/${experiment.slug}/placeholder.jpg`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: experiment.name,
        images: [
          `https://abjt.dev/lab/videos/lab/${experiment.slug}/placeholder.jpg`
        ],
      },
    };
  }
}

export default function Experiment({ params }: {
  params: Experiment;
}) {
  const experiment = experiments.find((experiment) => experiment.slug === params.slug);
  const index = experiments.findIndex((experiment) => experiment.slug === params.slug);
  const prev = (experiments[index + 1] && experiments[index + 1].type) === "internal" ? experiments[index + 1] : null;
  const next = (experiments[index - 1] && experiments[index - 1].type) === "internal" ? experiments[index - 1] : null;

  return(
    <>
      {experiment ? (
        <section className="sm:pt-[7.5rem] flex flex-col gap-8 items-start justify-start sm:basis-3/4">
          <div className="flex justify-between items-center gap-8 w-full">
            <div className="flex flex-col gap-1">
              <h1
                className={clsx(
                  "text-base text-neutral-50 font-kaiseiTokumin",
                  styles.fadein
                )}
                style={{
                  animationDelay: `calc(var(--animation-delay-lab) + 0.1s)`,
                }}
              >
                {experiment.name}
              </h1>
              <p
                className={clsx(
                  "text-neutral-500 text-xs",
                  styles.fadein
                )}
                style={{
                  animationDelay: `calc(var(--animation-delay-lab) + 0.2s)`,
                }}
              >{experiment.date}</p>
            </div>
            <div
              className={clsx(
                "flex flex-col gap-4 text-xs text-neutral-500",
                styles.fadein
              )}
              style={{
                animationDelay: `calc(var(--animation-delay-lab) + 0.3s)`,
              }}
            >
              <a href={experiment.source} target="_blank" title="view source code" className="rounded-full bg-neutral-950 p-2 text-neutral-400 border border-neutral-800 scale-100 transition-all duration-150 will-change-auto hover:text-neutral-200 hover:border-neutral-600 active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </a>
            </div>
          </div>
          <div
            className={clsx(
              "w-full rounded-md border border-neutral-900 p-12 sm:p-16 flex justify-center items-center bg-neutral-1000 overflow-hidden relative self-center",
              styles.showcase
            )}
            style={{
              animationDelay: `calc(var(--animation-delay-lab) + 0.3s)`,
            }}
          >
            <ExperimentExport slug={experiment.slug} />
          </div>
          <div
            className={clsx(
              "flex justify-between items-center gap-8 w-full",
              styles.fadein
            )}
            style={{
              animationDelay: `calc(var(--animation-delay-lab) + 0.3s)`,
            }}
          >
            <div>
              {prev ? (
                <Link href={`/lab/${prev.slug}`} className="flex flex-col gap-1 text-left group">
                  <p className="text-xs text-neutral-500">Previous</p>
                  <h2 className="text-sm text-neutral-50 underline underline-offset-4 decoration-transparent transition-all duration-150 will-change-auto group-hover:decoration-neutral-600">{prev.name}</h2>
                </Link>
              ) : null}
            </div>
            <div>
              {next ? (
                <Link href={`/lab/${next.slug}`} className="flex flex-col gap-1 text-right group">
                  <p className="text-xs text-neutral-500">Next</p>
                  <h2 className="text-sm text-neutral-50 underline underline-offset-4 decoration-transparent transition-all duration-150 will-change-auto group-hover:decoration-neutral-600 ">{next.name}</h2>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}