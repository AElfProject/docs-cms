import { fetcher } from "@/lib/api";
import { z } from "zod";
import { nodeSchema } from "./node-schema";

const schema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    items: z.array(nodeSchema),
    page_token: z.string(),
    has_more: z.boolean(),
  }),
});

export async function getChildNodes(parentId: string) {
  const res = await fetcher(
    `https://open.larksuite.com/open-apis/wiki/v2/spaces/${process.env.SPACE_ID}/nodes?parent_node_token=${parentId}`,
    { tags: [parentId] }
  );
  return schema.parse(res);
}
