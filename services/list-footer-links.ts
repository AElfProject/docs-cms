import { getTopLevelNodes } from "./get-top-level-nodes";
import { listTableRecords } from "./list-table-records";
import { listTables } from "./list-tables";
import { z } from "zod";

const fieldSchema = z.object({
  Category: z.string(),
  Label: z.string(),
  Link: z.object({
    link: z.string(),
    text: z.string(),
  }),
});

const schema = z.array(
  z.object({
    fields: fieldSchema,
    id: z.string(),
    record_id: z.string(),
  })
);

type Field = z.infer<typeof fieldSchema>;

const linksSchema = z.record(z.string(), z.array(fieldSchema));

export async function listFooterLinks() {
  const topLevelNodes = await getTopLevelNodes();
  const bitableNode = topLevelNodes.data.items.find(
    (node) => node.obj_type === "bitable"
  );

  if (!bitableNode) throw new Error("No Base.");

  const bitableId = bitableNode.obj_token;
  const tables = await listTables(bitableId);

  if (!tables) throw new Error("No tables in Base.");

  const footerLinksTable = tables.data.items.find(
    (item) => item.name === "Footer Links"
  );

  if (!footerLinksTable) throw new Error("No 'Footer Links' table in Base.");

  const { table_id } = footerLinksTable;
  const records = await listTableRecords(bitableId, table_id);

  const { items } = records.data;

  const links = schema.parse(items);

  const res = links
    .map((link) => link.fields)
    .reduce((acc, cur) => {
      if (!acc[cur.Category]) acc[cur.Category] = [cur];
      else acc[cur.Category].push(cur);

      return acc;
    }, {} as { [key: string]: Field[] });

  return linksSchema.parse(res);
}
