import ExperimentExport from "@/components/lab/experiments/ExperimentExport";
import { experiments } from "@/data/experiments";
import styles from "@/styles/Experiment.module.css";
import clsx from "clsx";

export function generateStaticParams() {
  const data = experiments.map((experiment) => ({
    params: {
      slug: experiment.slug,
    },
  }));

  return data;
}

export default function Experiment({ params }: {
  params: Experiment;
}) {
  const experiment = experiments.find((experiment) => experiment.slug === params.slug);

  return(
    <>
      {experiment ? (
        <section className="flex-1 max-w-full sm:max-w-xl sm:pt-[7.5rem] flex flex-col gap-8 items-start justify-start">
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
              >March 2023</p>
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
              <a href={experiment.source} target="_blank" title="view source code" className="rounded-full bg-neutral-950 p-2 text-neutral-400 border border-neutral-800 scale-100 transition-all duration-150 hover:text-neutral-200 hover:border-neutral-600 active:scale-90">
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
        </section>
      ) : null}
    </>
  )
}