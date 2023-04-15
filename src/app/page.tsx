import styles from "@/styles/Home.module.css";
import Social from "@/components/home/Social";
import clsx from "clsx";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-8 items-start justify-start max-w-xl sm:pt-[7.825rem]">
      <div className="relative">
        <div className="relative">
          <div id="light" className={clsx(
            "absolute top-0 left-0 sm:top-24 sm:-left-4 origin-top blur-xl mix-blend-color-dodge z-10 pointer-events-none will-change-transform",
            styles.light
          )}></div>
        </div>
        <h1 className={clsx(
          "text-3xl text-neutral-50 font-kaiseiTokumin",
          styles.fadein
        )}>
          Abhijeet Singh
        </h1>
      </div>
      <div className="flex flex-col items-start justify-start gap-4 text-neutral-500 text-lg sm:text-base">
        <p className={styles.fadein}>Crafting <span className="text-neutral-50">engaging experiences</span> for the Internet.</p>
        <p className={styles.fadein}>With a creative approach to development, I add intuitiveness and life to my work. Building beautiful interfaces and performant backend applications for professional, academic, and personal projects.</p>
        <p className={styles.fadein}>Outside of programming, I enjoy making 3d renders and animations.</p>
      </div>
      <div className={clsx(
        "flex justify-between gap-8 w-max",
        styles.fadein
      )}>
        <Social />
      </div>
    </main>
  )
}
