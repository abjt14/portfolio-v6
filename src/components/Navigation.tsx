"use client"

import styles from "@/styles/Navigation.module.css";
import { useCallback, useEffect, useMemo } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const path = usePathname();

  const links = useMemo(() => [
    {
      href: '/',
      label: 'Home',
      type: 'internal'
    },
    {
      href: '/lab',
      label: 'Lab',
      type: 'internal'
    },
    {
      href: '/writing',
      label: 'Writing',
      type: 'internal'
    },
    {
      href: 'https://read.cv/abjt',
      label: 'Resume',
      type: 'external'
    }
  ], []);

  const isActive = useCallback((href: string) => {
    if (path === "/") {
      return href === path;
    }
    if (href !== links[0].href) {
      return path.includes(href);
    }
  }, [path, links]);

  useEffect(() => {
    links.forEach(({ href, type }) => {
      if (type === "external") return;
      if (isActive(href)) {
        const timeoutId = setTimeout(() => {
          if (href === "/") {
            document.documentElement.style.setProperty(`--animation-delay-home`, `0.25s`);
          } else {
            document.documentElement.style.setProperty(`--animation-delay-${href.slice(1)}`, `0.25s`);
          }
        }, 3000);
        return () => clearTimeout(timeoutId);
      } else {
        if (href === "/") {
          document.documentElement.style.setProperty(`--animation-delay-home`, `0.25s`);
        } else {
          document.documentElement.style.setProperty(`--animation-delay-${href.slice(1)}`, `0.25s`);
        }
        return;
      }
    });
  }, [isActive, links, path]);

  return (
    <aside className={clsx(
      "sm:sticky sm:top-0 sm:z-20 sm:h-screen sm:basis-1/5",
      styles.aside
    )}>
      <div className={clsx(
        "sm:relative sm:pt-[12rem] sm:pb-5 sm:after:will-change-auto sm:h-full block sm:flex sm:flex-col sm:justify-between",
        styles.aside
      )}>
        <nav className={clsx(
          "sm:z-30 sm:pr-6 sm:sticky sm:after:will-change-auto",
          "sm:after:content-[''] sm:after:absolute sm:after:top-[0%] sm:after:-right-[calc(.15rem)] sm:after:w-1 sm:after:h-1/4 sm:after:rounded-md sm:after:transition-all sm:after:duration-300 sm:after:transform-gpu sm:after:will-change-auto",
          styles.pill,
          path === links[0].href && 'sm:after:top-[0%]',
          path.includes(links[1].href) && 'sm:after:top-[25%]',
          path.includes(links[2].href) && 'sm:after:top-[50%]',
        )}>
          <ul className="relative flex gap-6 justify-start items-center sm:flex-col sm:gap-0 sm:items-end sm:justify-between">
            {links.map(({ href, label, type }, index) => (
              <li key={index} className={clsx(
                "relative w-max sm:w-full py-0 sm:py-1 sm:first:pt-0 sm:last:pb-0",
                styles.fadein
              )}>
                <Link
                  href={href}
                  target={href.includes("http") ? "_blank" : "_self"}
                  className={clsx(
                    isActive(href) ? "text-neutral-50 underline underline-offset-4 sm:no-underline" : "text-neutral-500",
                    "flex gap-1 justify-end items-center lowercase nav-link text-base font-kaiseiTokumin transition-all duration-150 will-change-auto hover:text-neutral-50 group"
                  )}
                >
                  {(href === links[1].href || href === links[2].href) ?
                    (
                      <span className={clsx(
                        "hidden sm:inline text-neutral-500 opacity-0 transition-all duration-300 will-change-auto whitespace-nowrap",
                        isActive(href) &&
                        ((path.includes(links[1].href) && path !== "/lab") ||
                        (path.includes(links[2].href) && path !== "/writing")) &&
                        "opacity-100 group-hover:text-neutral-50"
                      )}>back to </span>
                    ) : null
                  }

                  {type === "external" && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none" className="w-6 h-6 pt-1 relative -right-1">
                      <rect width="180" height="180" fill="none"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M71.1505 23.1514L139.522 41.4715C148.962 44.001 154.564 53.7043 152.035 63.1444L130.28 144.336C127.75 153.776 118.047 159.378 108.607 156.849L40.2353 138.528C30.7952 135.999 25.193 126.296 27.7225 116.855L49.4776 35.6643C52.0071 26.2242 61.7104 20.622 71.1505 23.1514ZM68.8605 31.6979C64.1404 30.4331 59.2888 33.2342 58.024 37.9543L36.2689 119.146C35.0042 123.866 37.8053 128.717 42.5254 129.982L110.897 148.302C115.617 149.567 120.469 146.766 121.733 142.046L143.488 60.8544C144.753 56.1344 141.952 51.2827 137.232 50.018L68.8605 31.6979Z" fill="currentColor"/>
                      <path d="M67.409 54.2092C68.0414 51.8492 70.4672 50.4486 72.8273 51.081L124.106 64.8211C126.466 65.4534 127.867 67.8792 127.234 70.2393C126.602 72.5993 124.176 73.9999 121.816 73.3675L70.5373 59.6274C68.1772 58.9951 66.7767 56.5692 67.409 54.2092Z" fill="currentColor"/>
                      <path d="M61.684 75.5753C62.3164 73.2153 64.7422 71.8147 67.1022 72.4471L118.381 86.1872C120.741 86.8195 122.141 89.2454 121.509 91.6054C120.877 93.9654 118.451 95.366 116.091 94.7336L64.8122 80.9935C62.4522 80.3612 61.0516 77.9353 61.684 75.5753Z" fill="currentColor"/>
                      <path d="M55.959 96.9414C56.5913 94.5814 59.0172 93.1808 61.3772 93.8132L91.2898 101.828C93.6498 102.461 95.0503 104.886 94.418 107.246C93.7856 109.607 91.3598 111.007 88.9997 110.375L59.0872 102.36C56.7272 101.727 55.3266 99.3014 55.959 96.9414Z" fill="currentColor"/>
                    </svg>
                  )}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {
          (path.includes(links[2].href) && path !== links[2].href) &&
          <div className="text-xs text-neutral-500 pr-6 text-right hidden sm:block">
            Hold down <kbd className="text-neutral-50">Option</kbd> or <kbd className="text-neutral-50">Alt</kbd> key to enable focused reading.
          </div>
        }
      </div>
    </aside>
  )
}