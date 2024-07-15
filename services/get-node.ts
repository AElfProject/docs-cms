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

function findNodeInData(data: NodesData, key: string) {
  function search(items: NodesItem[]) {
    for (let item of items) {
      if (item.node_token === key) {
        return item;
      }
      if (item.children) {
        for (let child of item.children) {
          return search(child?.items);
        }
      }
    }

    return null;
  }

  return search(data.items);
}
