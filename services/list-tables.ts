import { fetcher } from "@/lib/api";
import { z } from "zod";

/**
 * https://open.larksuite.com/document/server-docs/docs/bitable-v1/app-table/list
 */
const schema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    has_more: z.boolean(),
    page_token: z.string(),
    total: z.number(),
    items: z.array(
      z.object({
        table_id: z.string(),
        revision: z.number(),
        name: z.string(),
      })
    ),
  }),
});

export async function listTables(bitableId: string) {
  const res = await fetcher(
    `https://open.larksuite.com/open-apis/bitable/v1/apps/${bitableId}/tables`,
    { tags: [bitableId] }
  );

  return schema.parse(res);
}
