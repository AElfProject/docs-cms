import { key } from "@/lib/utils";
import { Item } from "./common";
import {
  Table as _Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/api";
import Link from "next/link";
import clsx from "clsx";

export interface Sheet extends Item {
  block_type: 30;
  sheet: {
    token: string;
  };
}

type Cell =
  | string
  | {
      segmentStyle?: {
        bold: boolean;
        fontSize: number;
        foreColor: string;
        italic: boolean;
        strikeThrough: boolean;
        underline: boolean;
      };
      text?: string;
      type?: string;
      link?: string;
    }
  | null;

type CellOrArray = Cell | Cell[];

export async function Sheet(props: Sheet) {
  const {
    sheet: { token },
  } = props;
  const [tId, sheetId] = token.split("_");
  const allSheets = await fetcher<{
    code: number;
    data: {
      sheets: {
        grid_properties: {
          column_count: number;
          frozen_column_count: number;
          frozen_row_count: number;
          row_count: number;
        };
        hidden: boolean;
        index: number;
        resource_type: "sheet";
        sheet_id: string;
        title: string;
      }[];
    };
    msg: string;
  }>(
    `https://open.larksuite.com/open-apis/sheets/v3/spreadsheets/${tId}/sheets/query`,
    { tags: [tId] }
  );

  const sheet = allSheets.data.sheets.find((i) => i.sheet_id === sheetId)!;
  const range = `${sheetId}!A1:${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
    sheet.grid_properties.column_count - 1
  )}${sheet.grid_properties.row_count}`;
  const rangeData = await fetcher<{
    code: number;
    data: {
      revision: number;
      spreadsheetToken: string;
      valueRange: {
        majorDimension: string;
        range: string;
        revision: number;
        values: CellOrArray[][];
      };
    };
    msg: string;
  }>(
    `https://open.larksuite.com/open-apis/sheets/v2/spreadsheets/${tId}/values/${range}`
  );

  const [headerRow, ...rows] = rangeData.data.valueRange.values;

  return (
    <_Table className="my-8 overflow-x-auto w-max">
      <TableHeader>
        <TableRow>
          {headerRow.map((i) => (
            <TableHead key={key()}>
              <CellRenderer cell={i} />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((i) => (
          <TableRow key={key()}>
            {i.map((j) => (
              <TableCell key={key()}>
                <CellRenderer cell={j} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </_Table>
  );
}

function CellRenderer({ cell }: { cell: CellOrArray }) {
  if (!cell) return "";

  if (typeof cell === "object") {
    if (Array.isArray(cell)) {
      return (
        <>
          {cell.map((i) => (
            <CellRenderer key={key()} cell={i} />
          ))}
        </>
      );
    }

    const { segmentStyle } = cell || {};
    const { bold, italic } = segmentStyle || {};

    if (cell.type === "text")
      return (
        <span
          className={clsx({
            "font-bold": bold,
            italic: italic,
          })}
        >
          {cell.text}
        </span>
      );
  }

  if (typeof cell === "string" || typeof cell === "number") {
    return cell;
  }

  if (cell.link) {
    return <Link href={cell.link}>{cell.text}</Link>;
  }

  console.log(cell);

  return "";
}