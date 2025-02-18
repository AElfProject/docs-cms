import { getTopLevelNodes } from "./get-top-level-nodes";
import { listTableRecords } from "./list-table-records";
import { listTables } from "./list-tables";
interface Field {
  Label: string;
}
export async function listHiddenMenu() {
  const topLevelNodes = await getTopLevelNodes();
  const bitableNode = topLevelNodes.data.items.find(
    node => node.obj_type === "bitable"
  );

  if (!bitableNode) return null;

  const bitableId = bitableNode.obj_token;
  const tables = await listTables(bitableId);

  if (!tables) return null;

  const hiddenMenuTable = tables.data.items.find(
    item => item.name === "Hidden Menu"
  );

  if (!hiddenMenuTable) return null;

  const { table_id } = hiddenMenuTable;
  const records = await listTableRecords(bitableId, table_id);

  const { items } = records.data;

  return items
    .filter(item => item.fields && (item.fields as Field).Label)
    .map(item => (item.fields as Field).Label);
}
