"use client";

import { useLayoutEffect, useState } from "react";

function isMobile(userAgent: string): boolean {
  const mobileRegex =
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
  return mobileRegex.test(userAgent);
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(true);

  useLayoutEffect(() => {
    setMobile(isMobile(window.navigator.userAgent));
  }, []);

  return mobile;
}
