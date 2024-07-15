import { NodesData, NodesItem } from "./larkServices";
import { getMenu } from "@/lib/utils";

export async function getNode(id: string) {
  const menu = await getMenu();

  const node = findNodeInData(menu, id);

  if (!node) {
    throw new Error(`${id} not found...`);
  }

  return node;
}

function findNodeInData(data: NodesData, key: string): NodesItem | null {
  function search(items: NodesItem[]): NodesItem | null {
    for (let item of items) {
      if (item.node_token === key) {
        return item;
      }
      if (item.children) {
        for (let child of item.children) {
          const result = search(child?.items);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }

  return search(data.items);
}
