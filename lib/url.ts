import { convert } from "url-slug";

export const convertArrToUrl = (strArr: string[]) => {
  if (!Array.isArray(strArr)) return "";
  // URL cannot contain a # symbol
  return convert(strArr.join(" ").replace("c#", "csharp"));
};
