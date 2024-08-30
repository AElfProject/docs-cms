import { z } from "zod";
import { getNodeToken, NodesItem } from "../services/larkServices";
import { getConfigContent } from "./utils";

const schema = z.object({
  image: z.string().url(),
  description: z.string(),
  title: z.string(),
  logoLight: z.string().url(),
  logoDark: z.string().url(),
  github: z.string().url(),
  blog: z.string().url().optional(),
  copyright: z.string(),
  footerTwitter: z.string().url().optional(),
  footerTelegram: z.string().url().optional(),
  footerDiscord: z.string().url().optional(),
  footerGitHub: z.string().url().optional(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaIcon: z.string().url(),
});

export const getBaseConfig = async () => {
  const nodes = await getNodeToken();
  const appToken = nodes.items.find((ele: NodesItem) => {
    return ele.title === "Configurations" && ele.obj_type === "bitable";
  })?.obj_token;
  const configObj: { [key: string]: any } = appToken
    ? await getConfigContent(appToken, "Base")
    : {};
  return schema.parse(configObj);
};
