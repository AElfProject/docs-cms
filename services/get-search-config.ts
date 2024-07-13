"use server";

import { getTopLevelNodes } from "./get-top-level-nodes";
import { listTableRecords } from "./list-table-records";
import { listTables } from "./list-tables";
import { z } from "zod";
import { searchConfigSchema } from "./search-config-schema";

const fieldSchema = z.object({
  Name: z.string(),
  Value: z.string(),
});

const schema = z.array(
  z.object({
    fields: z.unknown(),
    id: z.string(),
    record_id: z.string(),
  })
);

export async function getSearchConfig() {
  const topLevelNodes = await getTopLevelNodes();
  const bitableNode = topLevelNodes.data.items.find(
    (node) => node.obj_type === "bitable"
  );

  if (!bitableNode) throw new Error("No Base.");

  const bitableId = bitableNode.obj_token;
  const tables = await listTables(bitableId);

  if (!tables) throw new Error("No tables in Base.");

  const searchConfigTable = tables.data.items.find(
    (item) => item.name === "Search"
  );

  if (!searchConfigTable) throw new Error("No 'Search' table in Base.");

  const { table_id } = searchConfigTable;
  const records = await listTableRecords(bitableId, table_id);

  const { items } = records.data;

  const links = schema.parse(items);

  const res = links
    .map((link) => link.fields)
    .reduce<{ [key: string]: string }>((acc, cur) => {
      const { success, data } = fieldSchema.safeParse(cur);
      if (success) {
        acc[data.Name] = data.Value;
      }

      return acc;
    }, {});

  return searchConfigSchema.parse(res);
}
