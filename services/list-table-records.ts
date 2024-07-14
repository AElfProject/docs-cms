import { fetcher } from "@/lib/api";
import { z } from "zod";

/**
 * https://open.larksuite.com/document/server-docs/docs/bitable-v1/app-table-record/list
 */
const schema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    has_more: z.boolean(),
    items: z.array(
      z.object({
        fields: z.unknown(),
        id: z.string(),
        record_id: z.string(),
      })
    ),
    total: z.number(),
  }),
});

export async function listTableRecords(bitableId: string, tableId: string) {
  const res = await fetcher(
    `https://open.larksuite.com/open-apis/bitable/v1/apps/${bitableId}/tables/${tableId}/records?page_size=100`,
    { tags: [bitableId, tableId] }
  );

  return schema.parse(res);
}
