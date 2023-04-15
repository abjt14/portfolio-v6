'use client';

import { experiments } from "@/data/experiments";
import useWindowWidth from "@/components/hooks/useWindowWidth";
import ExperimentPreview from "@/components/lab/ExperimentPreview";

const data = experiments.reverse();

export default function Experiments() {
  const width: number = useWindowWidth();

  return (
    <section className="flex-1 max-w-full sm:pt-[12.25rem] flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-1">
      {width !== 0 && (
        width >= 768 ? <TwoColumn data={data} /> : <OneColumn data={data} />
      )}
    </section>
  )
}

function OneColumn({data}: {data: Experiment[]}) {
  const processedData = data.map((experiment, index) => ({
    ...experiment,
    animationDelay: index * .1
  }));

  return(
    <>
      {processedData.map((experiment,) => (
        <ExperimentPreview key={experiment.slug} experiment={experiment} />
      ))}
    </>
  );
}

function TwoColumn({data}: {data: Experiment[]}) {
  const processedData = data.map((experiment, index) => ({
    ...experiment,
    animationDelay: index * .1
  }));

  const evenIndexed = processedData.filter((_, index) => index % 2 === 0);
  const oddIndexed = processedData.filter((_, index) => index % 2 !== 0);

  return(
    <>
      <div className="flex flex-col gap-1">
        {evenIndexed.map((experiment) => (
          <ExperimentPreview key={experiment.slug} experiment={experiment} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {oddIndexed.map((experiment) => (
          <ExperimentPreview key={experiment.slug} experiment={experiment} />
        ))}
      </div>
    </>
  )
}
