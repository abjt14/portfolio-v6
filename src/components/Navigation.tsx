"use client"

import styles from "@/styles/Navigation.module.css";
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
    return href.includes(path);
  }

  return (
    <aside className={clsx(
      "sm:relative sm:z-20 sm:pl-8 sm:after:will-change-auto",
      styles.aside
    )}>
      <nav className={clsx(
        "sm:z-30 sm:pr-6 sm:sticky sm:top-[12.25rem] sm:after:will-change-auto",
        "sm:after:content-[''] sm:after:absolute sm:after:top-[0%] sm:after:-right-[calc(.135rem)] sm:after:w-1 sm:after:h-1/4 sm:after:rounded-md sm:after:transition-all sm:after:duration-300 sm:after:transform-gpu",
        styles.pill,
        path === '/' && 'sm:after:top-[0%]',
        path === '/lab' && 'sm:after:top-[25%]',
        path === '/writing' && 'sm:after:top-[50%]',
        path === '/resume' && 'sm:after:top-[75%]'
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
    </aside>
  )
}