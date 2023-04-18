'use client';

import { useEffect, useState } from "react"

export default function CrypticText({ text }: { text: string }) {

  const [crytic, setCryptic] = useState('');

  useEffect(() => {
    const letters = "abcdefghijklmnopqrst1234567890                  ";
    const animationDelayFactor = 0.5;
    const repeatDivider = 4;

    const timeoutValue = parseInt(
      getComputedStyle(document.documentElement)
      .getPropertyValue('--animation-delay-writing')
      .replace('s', '')
    ) * 30 * animationDelayFactor;

    let iteration = 0;
    let elapsed = 0;
    let animation: number;

    function animate() {
      elapsed++;

      if ((elapsed > timeoutValue) && (elapsed % repeatDivider === 0)) {
        let encryption = text
          .split("")
          .map((letter, index) => {
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
  }, [text]);

  return (
    <span className="text-inherit truncate block">{crytic}</span>
  )
}