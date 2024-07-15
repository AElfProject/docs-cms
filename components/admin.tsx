"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Only show for admins.
 * @example localStorage.setItem("isAdmin", "isAdmin")
 * @example localStorage.removeItem("isAdmin")
 */
export function Admin({ children }: React.PropsWithChildren) {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      setShow(true);
    }

    return () => {
      setShow(false);
    };
  }, []);

  if (!show) return <></>;

  return <>{children}</>;
}
