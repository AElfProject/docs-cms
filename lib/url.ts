import slugify from "slugify";

export const convertArrToUrl = (strArr: string[]) => {
  if (!Array.isArray(strArr)) return "";
  const result = slugify(strArr.join(" ").replace("c#", "csharp"), {
    remove: /[*+~()'"?!:@]/g,
    lower: true,
    trim: true,
  });
  return result;
};
