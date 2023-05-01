'use client';

import clsx from "clsx";
import { useEffect, useState } from "react"

type CrypticTextDynamicProps = {
  text: string,
  classNames?: string,
  delay?: number,
}

export default function CrypticText({ text, classNames, delay }: CrypticTextDynamicProps) {

  const [crytic, setCryptic] = useState('');

  useEffect(() => {
    const letters = "abcdefghijklmnopqrst1234567890                  ";
    const repeatDivider = 4;

    const timeoutValue = (parseInt(
      getComputedStyle(document.documentElement)
      .getPropertyValue('--animation-delay-writing')
      .replace('s', '')
    ) + (delay ? delay : 0)) * 30 * 2;

    let iteration = 0;
    let elapsed = 0;
    let animation: number;

    function animate() {
      elapsed++;

      if ((elapsed > timeoutValue) && (elapsed % repeatDivider === 0)) {
        let encryption = text
          .split("")
          .map((_, index) => {
            if(index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("");

        if(iteration >= text.length){
          cancelAnimationFrame(animation);
        }
        iteration += text.length * .04;

        setCryptic(encryption);

        iteration++;
      }

      animation = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animation);
  }, [delay, text]);

  return (
    <span
      className={clsx(
        "text-inherit truncate block",
        classNames && classNames
      )}
      style={{
        animationDelay: `calc(var(--animation-delay-writing) + ${delay}s)`
      }}
    >
      {crytic}
    </span>
  )
}