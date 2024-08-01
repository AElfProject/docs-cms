import { toKebabCase } from "@/lib/utils";
import { getNode } from "./get-node";

export async function getPath(id: string, path: string[] = []) {
  const { parent_node_token, url_path } = await getNode(id);

  if (parent_node_token) {
    return await getPath(parent_node_token, [url_path, ...path]);
  } else {
    return ["/wiki", url_path, ...path].join("/");
  }
}
