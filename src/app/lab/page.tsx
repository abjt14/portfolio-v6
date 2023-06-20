import { Metadata } from "next";
import MasonryComponent from "@/components/lab/MasonryComponent";
import { experiments } from "@/data/experiments";

const data = experiments.reverse();

export const metadata: Metadata = {
  title: 'Lab',
  description: 'A collection of my experiments and side projects.',
};

export default function Experiments() {
  return (
    <section className="sm:py-[12.25rem] sm:basis-3/4">
      <MasonryComponent data={data} />
    </section>
  )
}
