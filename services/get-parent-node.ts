import { getNode } from "./get-node";

export async function getParentNode(id: string) {
  const {
    data: {
      node: { parent_node_token },
    },
  } = await getNode(id);

  if (!parent_node_token) return undefined;

  return await getNode(parent_node_token);
}
