"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HighlightLink({
  anchor,
  title,
  className,
}: {
  anchor: string;
  title: string;
  className: string;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // get your elements
    const el1 = document.getElementById(anchor);

    const observer = new IntersectionObserver(
      (entries) => {
        // do something with the entries

        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        rootMargin: "-60px",
        threshold: [1],
      }
    );

    // observe each element if it was found
    if (!!el1) observer.observe(el1);

    // stop observing when your component unmounts
    return () => {
      if (!!el1) observer.unobserve(el1);
    };
  }, [anchor]);

  return (
    <li
      className={clsx(
        {
          active: isIntersecting,
        },
        className
      )}
    >
      <Link href={`#${anchor}`}>{title}</Link>
    </li>
  );
}
