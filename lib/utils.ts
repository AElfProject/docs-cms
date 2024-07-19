import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getNodeToken, NodesData, NodesItem } from "../services/larkServices";
import { nanoid } from "nanoid";
import { convertArrToUrl } from "./url";
import { AnyItem } from "../components/blocks/renderer";

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
          if (search(child?.items, key)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  for (let item of data?.items) {
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
          if (find(child?.items)) {
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
          if (search(child?.items)) {
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
  let data = {} as NodesData,
    items;
  if (!folderNodes) {
    data = await getNodeToken();
    items = data?.items.filter(ele => {
      return ele.title !== "Configurations" && ele.obj_type !== "bitable";
    });
  } else {
    items = folderNodes;
  }

  for (let i = 0; i < items?.length; i++) {
    if (!items[i].children) {
      items[i].children = [];
    }
    if (items[i].has_child) {
      const child = (await getNodeToken(items[i].node_token)) as NodesData;
      if (child) {
        items[i].children?.push(child);
        await getFileByFolderToken(child?.items);
      }
    }
  }
  if (data) {
    data.items = items;
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

export function formatStringArray(ids: string[]): string[] {
  return ids?.map(id => {
    return id
      .split("-")
      .map(word => {
        // URL cannot contain a # symbol
        word = word.replace("csharp", "c#");
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  });
}
interface FindPathByTitlesResult {
  path: NodesItem | null;
  lastItemId: string | null;
}
export function findPathByTitles(
  data: NodesData,
  targetTitles: string[]
): FindPathByTitlesResult {
  function search(
    nodesData: NodesData,
    targetIndex: number
  ): FindPathByTitlesResult {
    if (targetIndex >= targetTitles?.length || !Array.isArray(targetTitles)) {
      return { path: null, lastItemId: null };
    }

    for (const item of nodesData.items) {
      if (capitalizeFirstLetter(item.title) === targetTitles?.[targetIndex]) {
        if (targetIndex === targetTitles?.length - 1) {
          return {
            path: { ...item, children: [] },
            lastItemId: item.node_token,
          };
        } else if (item.children) {
          for (const child of item.children) {
            const result = search(child, targetIndex + 1);
            if (result.path) {
              return {
                path: {
                  ...item,
                  children: [
                    {
                      has_more: false,
                      items: [result.path],
                      page_token: "",
                    },
                  ],
                },
                lastItemId: result.lastItemId,
              };
            }
          }
        }
      }
    }
    return { path: null, lastItemId: null };
  }

  return search(data, 0);
}

export function findIdByPath(item: NodesItem) {
  let temp = JSON.parse(JSON.stringify(item));
  let id;
  while (temp?.children?.length) {
    id = temp.node_token;
    for (let ele of temp.children[0].items) {
      temp = ele;
    }
  }
  return temp?.node_token;
}
export function toKebabCase(title: string): string {
  const words = title.split(" ");
  const kebabWords = words.map(word => {
    return word.toLowerCase();
  });
  return convertArrToUrl(kebabWords);
}
// hello World contract -> Hello World Contract
export function capitalizeFirstLetter(str: string) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function findTitlesById(menu: NodesData, id: string) {
  function search(
    nodesData: NodesData,
    currentPath: string[]
  ): string[] | null {
    for (const item of nodesData.items) {
      const newPath = [...currentPath, toKebabCase(item.title)];
      if (item.node_token === id || item.obj_token === id) {
        return newPath;
      }
      if (item.children) {
        for (const child of item.children) {
          const result = search(child, newPath);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }

  return search(menu, []);
}
