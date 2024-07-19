export function isMobile(userAgent: string): boolean {
  const mobileRegex =
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
  return mobileRegex.test(userAgent);
}
