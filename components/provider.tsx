"use client";

import { useIsMobile } from "@/lib/isMobile";
import { PropsWithChildren } from "react";

export function Mobile({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  if (isMobile) return children;

  return null;
}

export function Desktop({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  if (!isMobile) return children;

  return null;
}
