import { toKebabCase } from "@/lib/utils";
import { getNode } from "./get-node";

export async function getPath(id: string, path: string[] = []) {
  const { parent_node_token, title } = await getNode(id);

  if (parent_node_token) {
    return await getPath(parent_node_token, [toKebabCase(title), ...path]);
  } else {
    return ["/wiki", toKebabCase(title), ...path].join("/");
  }
}
