import clsx from "clsx";
import Link from "next/link";
import styles from "@/styles/Lab.module.css";

interface processedData extends Experiment {
  animationDelay: number;
}

export default function ExperimentPreview({experiment}: {experiment: processedData}) {
  return (
    <Link href={experiment.link} target={experiment.type === "internal" ? "_self" : "_blank"}>
      <div
        className={clsx(
          "relative rounded-md bg-neutral-950 border border-neutral-900 p-1 overflow-hidden group",
          "after:opacity-0 after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:from-50% after:to-black after:z-10 after:pointer-events-none after:transition-all after:duration-300 after:hover:opacity-100",
          styles.fadein
        )}
        style={{animationDelay: `calc(var(--animation-delay-lab) + ${experiment.animationDelay}s)`}}
      >
        <div className="video-container">
          <video autoPlay muted playsInline loop className="rounded-md contrast-[1.075]" poster={`/videos/lab/${experiment.slug}/placeholder.jpg`}>
            <source src={`/videos/lab/${experiment.slug}/optimized.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-full flex justify-between items-end gap-4 p-3 z-20 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xs text-neutral-200 flex gap-1 justify-start items-center">
            {experiment.name}
            {experiment.type === "external" && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            )}
          </h3>
          <p className="text-xs text-neutral-400">March 2023</p>
        </div>
      </div>
    </Link>
  )
}