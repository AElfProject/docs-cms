import { toKebabCase } from "@/lib/utils";
import { getNode } from "./get-node";

export async function getPath(id: string, path: string[] = []) {
  const node = await getNode(id);
  const parentId = node.data.node.parent_node_token;

  if (parentId) {
    return await getPath(parentId, [
      toKebabCase(node.data.node.title),
      ...path,
    ]);
  } else {
    return ["/wiki", toKebabCase(node.data.node.title), ...path].join("/");
  }
}
