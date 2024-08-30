"use client";

import { useTheme } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export function Light({ children }: Props) {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light") return <>{children}</>;
}

export function Dark({ children }: Props) {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme !== "light") return <>{children}</>;
}
