import { getNode } from "@/services/get-node";
import { toKebabCase } from "@/lib/utils";
import { redirect } from "next/navigation";

async function getData(id: string, path: string[] = []) {
  const node = await getNode(id);
  const parentId = node.parent_node_token;

  if (parentId) {
    return await getData(parentId, [toKebabCase(node.title), ...path]);
  } else {
    return ["/wiki", toKebabCase(node.title), ...path].join("/");
  }
}

export default async function Document({
  params: { id },
}: {
  params: { id: string };
}) {
  const path = await getData(id);

  redirect(path);
}
