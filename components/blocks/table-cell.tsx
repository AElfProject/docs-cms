import { Item } from "./common";
import Renderer from "./renderer";
import {
  Table as _Table,
  TableCell as _TableCell,
} from "@/components/ui/table";

export interface TableCell extends Item {
  block_type: 32;
  children: string[];
  table_cell: {};
}

export function TableCell(props: TableCell) {
  const { allItems, children } = props;
  const allChildren = allItems.filter((i) => children.includes(i.block_id));

  return (
    <_TableCell>
      {allChildren.map((i) => (
        <Renderer key={i.block_id} {...i} allItems={allItems} nested />
      ))}
    </_TableCell>
  );
}
