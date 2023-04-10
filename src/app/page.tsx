import styles from "@/styles/Home.module.css";
import Social from "@/components/home/Social";
import clsx from "clsx";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-8 items-start justify-start max-w-xl sm:pt-[8.125rem]">
      <div className="flex gap-8 relative flex-col sm:flex-row sm:gap-4">
        <div className="relative">
          <div id="bulb" className={clsx(
            "inline-block rounded-full py-[.4rem] px-[1.1rem] aspect-square border border-neutral-50 will-change-transform relative z-20",
            styles.bulb
          )}>❘</div>
          <div id="light" className={clsx(
            "absolute top-6 left-6 origin-top blur-xl mix-blend-color-dodge z-10 pointer-events-none will-change-transform",
            styles.light
          )}></div>
        </div>
        <h1 className="text-3xl text-neutral-50 font-kaiseiTokumin">
          Abhijeet Singh
        </h1>
      </div>
      <div className="flex flex-col items-start justify-start gap-4 text-neutral-500 text-lg sm:text-base">
        <p>Crafting <span className="text-neutral-50">engaging experiences</span> for the Internet.</p>
        <p>With a creative approach to development, I add intuitiveness and life to my work. Building beautiful interfaces and performant backend applications for professional, academic, and personal projects.</p>
        <p>When I&#39;m not busy writing code, I make digital artwork.</p>
      </div>
      <div className="flex justify-between gap-8 w-max">
        <Social />
      </div>
    </main>
  )
}
