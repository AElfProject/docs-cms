import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getNodeToken, NodesData, NodesItem } from "../services/larkServices";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findTopLevelItems(data: NodesData, key: string) {
  function search(items: NodesItem[], key: string) {
    for (let item of items) {
      if (item.node_token === key) {
        return true;
      }
      if (item.children) {
        for (let child of item.children) {
          if (search(child.items, key)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  for (let item of data.items) {
    if (search([item], key)) {
      return [item];
    }
  }
  return null;
}
export function findPathByKey(data: NodesData, key: string) {
  let path: NodesItem[] = [];

  function find(items: NodesItem[]) {
    for (let item of items) {
      if (item.node_token === key) {
        path.push(item);
        return true;
      } else if (item.has_child && item.children.length > 0) {
        for (let child of item.children) {
          if (find(child.items)) {
            // Add item to the beginning of path array
            path.unshift(item);
            return true;
          }
        }
      }
    }
    return false;
  }
  if (Array.isArray(data.items)) {
    find(data.items);
  }

  return path;
}

export function findKeyInData(data: NodesData, key: string) {
  function search(items: NodesItem[]) {
    for (let item of items) {
      if (item.node_token === key) {
        return true;
      }
      if (item.children) {
        for (let child of item.children) {
          if (search(child.items)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  return search(data.items);
}

export async function getFileByFolderToken(folderNodes?: NodesItem[]) {
  let data, items;
  if (!folderNodes) {
    data = await getNodeToken();
    items = data?.items;
  } else {
    items = folderNodes;
  }

  for (let i = 0; i < items.length; i++) {
    if (!items[i].children) {
      items[i].children = [];
    }
    if (items[i].has_child) {
      const child = (await getNodeToken(items[i].node_token)) as NodesData;
      items[i].children?.push(child);
      await getFileByFolderToken(child.items);
    }
  }
  return data as NodesData;
}

export async function getMenu() {
  const data = await getFileByFolderToken();
  return data;
}

export function key() {
  return nanoid();
}
