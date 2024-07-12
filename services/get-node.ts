import { fetcher } from "@/lib/api";
import { z } from "zod";

export const nodeSchema = z.object({
  space_id: z.string(),
  node_token: z.string(),
  obj_token: z.string(),
  obj_type: z.string(),
  parent_node_token: z.string(),
  node_type: z.string(),
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
