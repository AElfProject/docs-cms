import { getChildNodes } from "./get-child-nodes";
import { getParentNode } from "./get-parent-node";

export async function getNextNode(id: string) {
  const parentNode = await getParentNode(id);

  if (!parentNode) {
    return undefined;
  }

  const {
    data: { items },
  } = await getChildNodes(parentNode.node_token);

  const siblingNodes = items;

  const position = siblingNodes.findIndex((i) => i.node_token === id);

  if (position === siblingNodes.length - 1) {
    return undefined;
  }

  return siblingNodes[position + 1];
}
