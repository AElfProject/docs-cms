import { fetcher } from "@/lib/api";
import { z } from "zod";
import { nodeSchema } from "./node-schema";

/**
 * https://open.larksuite.com/document/server-docs/docs/wiki-v2/space-node/list
 */
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
