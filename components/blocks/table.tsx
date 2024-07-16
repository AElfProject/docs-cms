import { key } from "@/lib/utils";
import { Item } from "./common";
import Renderer from "./renderer";
import {
  Table as _Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback } from "react";

export interface Table extends Item {
  block_type: 31;
  children: string[];
  table: {
    cells: string[];
    property: {
      column_size: number;
      column_width: number[];
      header_row: boolean;
      merge_info: {
        col_span: number;
        row_span: number;
      }[];
      row_size: number;
    };
  };
}

function rowSplitter(cells: string[], size: number) {
  const a = [...cells];
  const arrays = [];

  while (a.length > 0) arrays.push(a.splice(0, size));

  return arrays;
}

export function Table(props: Table) {
  const {
    allItems,
    children,
    table: {
      property: { header_row, column_size },
    },
  } = props;
  const allChildren = allItems.filter((i) => children.includes(i.block_id));

  const [headerRow, ...rows] = rowSplitter(children, column_size);

  const getChildById = useCallback(
    (id: string) => {
      return allChildren.find((i) => i.block_id === id)!;
    },
    [allChildren]
  );

  return (
    <_Table className="my-8 overflow-x-auto w-max">
      {header_row ? (
        <TableHeader>
          <TableRow>
            {headerRow.map((i) => (
              <TableHead key={i}>
                <Renderer {...getChildById(i)} allItems={allItems} nested />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      ) : null}
      <TableBody>
        {(headerRow ? rows : [headerRow, ...rows]).map((i) => (
          <TableRow key={key()}>
            {i.map((j) => (
              <TableCell key={j}>
                <Renderer {...getChildById(j)} allItems={allItems} nested />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </_Table>
  );
}
