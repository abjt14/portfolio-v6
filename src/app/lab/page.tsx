'use client';

import styles from "@/styles/Lab.module.css";
import { useState, useEffect } from "react";
import { experiments } from "@/data/experiments";
import clsx from "clsx";
import Link from "next/link";

const data = experiments.reverse();

export default function Experiments() {
  const width: number = useWindowWidth();

  return (
    <section className={clsx(
      "max-w-full sm:py-[12.25rem]",
      width !== 0 && (
        width > 640 ? "flex gap-1" : "flex flex-col gap-4"
      )
    )}>
      {
        width !== 0 && (
          width > 640 ? <TwoColumn data={data} /> : <OneColumn data={data} />
        )
      }
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
        <Experiment key={experiment.id} experiment={experiment} />
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
        {evenIndexed.map((experiment, index) => (
          <Experiment key={experiment.id} experiment={experiment} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {oddIndexed.map((experiment, index) => (
          <Experiment key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </>
  )
}

interface processedData extends Experiment {
  animationDelay: number;
}

function Experiment({experiment}: {experiment: processedData}) {
  return (
    <Link href={experiment.link} target={experiment.type === "internal" ? "_self" : "_blank"}>
      <div
        className={clsx(
          "relative rounded-md bg-neutral-950 border border-neutral-900 p-1 overflow-hidden group",
          "after:opacity-0 after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:from-40% after:to-black after:z-10 after:pointer-events-none after:transition-opacity after:duration-300 after:hover:opacity-100",
          styles.fadein
        )}
        style={{animationDelay: `calc(var(--animation-delay-base) + ${experiment.animationDelay}s)`}}
      >
        <div className="video-container">
          <video autoPlay muted playsInline loop className="rounded-md contrast-[1.075]" poster={`/videos/lab/${experiment.id}/placeholder.jpg`}>
            <source src={`/videos/lab/${experiment.id}/optimized.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-between items-end gap-4 p-3 z-20 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xs font-bold text-neutral-400">{experiment.name}</h3>
          <p className="text-xs text-neutral-600">March 2023</p>

        </div>
      </div>
    </Link>
  )
}

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!windowWidth) return 0;
  return windowWidth;
}