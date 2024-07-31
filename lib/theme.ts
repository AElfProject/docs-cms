export const getThemeConfig = (theme: string | undefined, arr: any[]) => {
  return theme === "light" || !theme ? arr[0] : arr[1];
};
