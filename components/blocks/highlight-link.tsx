"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HighlightLink({
  anchor,
  title,
}: {
  anchor: string;
  title: string;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // get your elements
    const el1 = document.getElementById(anchor);

    const observer = new IntersectionObserver(entries => {
      // do something with the entries

      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting);
      });
    });

    // observe each element if it was found
    if (!!el1) observer.observe(el1);

    // stop observing when your component unmounts
    return () => {
      if (!!el1) observer.unobserve(el1);
    };
  }, [anchor]);

  return (
    <Link
      href={`#${anchor}`}
      className={clsx({
        "sm:font-bold": isIntersecting,
      })}
    >
      {title}
    </Link>
  );
}
