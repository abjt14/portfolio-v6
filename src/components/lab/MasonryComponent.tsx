'use client';

import { useWindowSize } from 'usehooks-ts';
import ExperimentPreview from "./ExperimentPreview";

export default function MasonryComponent({data}: {data: Experiment[]}) {
  const { width, height } = useWindowSize();

  const processedData = data.map((experiment, index) => ({
    ...experiment,
    animationDelay: index * .1
  }));

  return (
    width < 768 ? <OneColumn processedData={processedData} /> : <TwoColumn processedData={processedData} />
  )
}

interface ProcessedData extends Experiment {
  animationDelay: number;
}

function OneColumn({processedData}: {processedData: ProcessedData[]}) {
  return(
    <div className="md:hidden flex flex-col gap-4 sm:gap-6">
      {processedData.map((experiment) => (
        <ExperimentPreview key={experiment.slug} experiment={experiment} />
      ))}
    </div>
  );
}

function TwoColumn({processedData}: {processedData: ProcessedData[]}) {
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