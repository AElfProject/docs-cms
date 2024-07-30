import { getNodeToken, NodesItem } from "../services/larkServices";
import { getConfigContent } from "./utils";

export const getBaseConfig = async () => {
  const nodes = await getNodeToken();
  const appToken = nodes.items.find((ele: NodesItem) => {
    return ele.title === "Configurations" && ele.obj_type === "bitable";
  })?.obj_token;
  const configObj: { [key: string]: any } = appToken
    ? await getConfigContent(appToken, "Base")
    : {};
  return configObj;
};
