"use client"

import styles from "@/styles/Navigation.module.css";
import { useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const links = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/lab',
      label: 'Lab',
    },
    {
      href: '/writing',
      label: 'Writing',
    },
    {
      href: '/resume',
      label: 'Resume',
    }
  ]

  const path = usePathname();

  const isActive = (href: string) => {
    if (path === "/") {
      return href === path;
    }
    if (href !== links[0].href) {
      return path.includes(href);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.documentElement.setAttribute('style', '--animation-delay-base: .25s !important');
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <aside className={clsx(
      "sm:sticky sm:top-0 sm:z-20 sm:h-screen",
      styles.aside
    )}>
      <div className={clsx(
        "sm:relative sm:pl-8 sm:pt-[12.25rem] sm:after:will-change-auto sm:h-full",
        styles.aside
      )}>
        <nav className={clsx(
          "sm:z-30 sm:pr-6 sm:sticky sm:after:will-change-auto",
          "sm:after:content-[''] sm:after:absolute sm:after:top-[0%] sm:after:-right-[calc(.135rem)] sm:after:w-1 sm:after:h-1/4 sm:after:rounded-md sm:after:transition-all sm:after:duration-300 sm:after:transform-gpu",
          styles.pill,
          path === links[0].href && 'sm:after:top-[0%]',
          path.includes(links[1].href) && 'sm:after:top-[25%]',
          path.includes(links[2].href) && 'sm:after:top-[50%]',
          path.includes(links[3].href) && 'sm:after:top-[75%]'
        )}>
          <ul className="relative flex gap-6 justify-start items-center sm:flex-col sm:gap-0 sm:items-end sm:justify-between">
            {links.map(({ href, label }, index) => (
              <li key={index} className={clsx(
                "relative w-min py-0 sm:py-1 sm:first:pt-0 sm:last:pb-0",
                styles.fadein
              )}>
                <Link
                  href={href}
                  className={clsx(
                    isActive(href) ? "text-neutral-50 underline underline-offset-4 sm:no-underline" : "text-neutral-500",
                    "lowercase nav-link text-base font-kaiseiTokumin transition-all duration-150 will-change-auto hover:text-neutral-50"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}