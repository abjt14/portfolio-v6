import { experiments } from "@/data/experiments";
import ExperimentPreview from "@/components/lab/ExperimentPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Lab',
  description: 'A collection of my experiments and side projects.',
};

const data = experiments.reverse();

export default function Experiments() {
  return (
    <section className="sm:pt-[12.25rem]">
      <OneColumn data={data} />
      <TwoColumn data={data} />
    </section>
  )
}

function OneColumn({data}: {data: Experiment[]}) {
  const processedData = data.map((experiment, index) => ({
    ...experiment,
    animationDelay: index * .1
  }));

  return(
    <div className="md:hidden flex flex-col gap-4">
      {processedData.map((experiment) => (
        <ExperimentPreview key={experiment.slug} experiment={experiment} />
      ))}
    </div>
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
    <div className="hidden sm:flex md:flex-row sm:gap-6 md:gap-1">
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
    </div>
  )
}
