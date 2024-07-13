import { fetcher } from "@/lib/api";
import { z } from "zod";

/**
 * https://open.larksuite.com/document/server-docs/docs/wiki-v2/space-node/list
 */
export const nodeSchema = z.object({
  space_id: z.string(),
  node_token: z.string(),
  obj_token: z.string(),
  obj_type: z.enum(["doc", "sheet", "mindnote", "bitable", "file", "docx"]),
  parent_node_token: z.string(),
  node_type: z.enum(["origin", "shortcut"]),
  origin_node_token: z.string(),
  origin_space_id: z.string(),
  has_child: z.boolean(),
  title: z.string(),
  obj_create_time: z.string(),
  obj_edit_time: z.string(),
  node_create_time: z.string(),
  creator: z.string(),
  owner: z.string(),
});

const schema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    node: nodeSchema,
  }),
});

export async function getNode(id: string) {
  const res = await fetcher(
    `https://open.larksuite.com/open-apis/wiki/v2/spaces/get_node?token=${id}`
  );

  return schema.parse(res);
}
