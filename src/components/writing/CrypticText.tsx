'use client';

import { useEffect, useState } from "react"

export default function CrypticText({ text }: { text: string }) {

  const [crytic, setCryptic] = useState('');

  useEffect(() => {
    const letters = "abcdefghijklmnopqrst1234567890                  ";

    const timeoutValue = parseInt(
      getComputedStyle(document.documentElement)
      .getPropertyValue('--animation-delay-writing')
      .replace('s', '')
    ) * 500;

    let iteration = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
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
          clearInterval(interval);
        }
        iteration += text.length * .04;

        setCryptic(encryption);
      }, 50);

      return () => clearInterval(interval);
    }, timeoutValue);

    return () => clearInterval(timeout);
  }, [text]);

  return (
    <span className="text-inherit truncate block">{crytic}</span>
  )
}