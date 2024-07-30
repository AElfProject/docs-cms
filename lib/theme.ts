export const getThemeConfig = (theme: string | undefined, arr: any[]) => {
  console.log(theme, arr, "xxxx");
  return theme === "light" || !theme ? arr[0] : arr[1];
};
