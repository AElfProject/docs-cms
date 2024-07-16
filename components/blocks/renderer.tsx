import type GithubSlugger from "github-slugger";
import { Heading1 } from "./heading1";
import { Heading3 } from "./heading3";
import { Text } from "./text";
import { Heading4 } from "./heading4";
import { Bullet } from "./bullet";
import { Ordered } from "./ordered";
import { Code } from "./code";
import { Quote } from "./quote";
import { Page } from "./page";
import { Heading2 } from "./heading2";
import { Image } from "./image";
import { Callout } from "./callout";
import { Tab, Tabs } from "./tabs";
import { Synched } from "./synched";
import { Divider } from "./divider";
import { Heading5 } from "./heading5";
import { Heading6 } from "./heading6";
import { Heading7 } from "./heading7";
import { Heading8 } from "./heading8";
import { Heading9 } from "./heading9";
import { ChildPages } from "./child-pages";
import { Table } from "./table";
import { TableCell } from "./table-cell";
import { Sheet } from "./sheet";

export type AnyItem =
  | ChildPages
  | Page
  | Text
  | Heading1
  | Heading2
  | Heading3
  | Heading4
  | Heading5
  | Heading6
  | Heading7
  | Heading8
  | Heading9
  | Bullet
  | Ordered
  | Code
  | Callout
  | Divider
  | Tab
  | Tabs
  | Image
  | Table
  | TableCell
  | Quote
  | Synched
  | Sheet;

export default function Renderer(
  props: AnyItem & {
    allItems: AnyItem[];
    nested?: boolean;
    slugger: GithubSlugger;
  }
) {
  const first = props.allItems[0];
  if (
    first.block_type === 1 &&
    props.block_id !== first.block_id &&
    !props.nested
  ) {
    if (!first.children.includes(props.block_id)) return <></>;
  }

  switch (props.block_type) {
    case 1:
      return <Page {...props} />;

    case 2:
      return <Text {...props} />;

    case 3:
      return <Heading1 {...props} />;

    case 4:
      return <Heading2 {...props} />;

    case 5:
      return <Heading3 {...props} />;

    case 6:
      return <Heading4 {...props} />;

    case 7:
      return <Heading5 {...props} />;

    case 8:
      return <Heading6 {...props} />;

    case 9:
      return <Heading7 {...props} />;

    case 10:
      return <Heading8 {...props} />;

    case 11:
      return <Heading9 {...props} />;

    case 12:
      return <Bullet {...props} />;

    case 13:
      return <Ordered {...props} />;

    case 14:
      return <Code {...props} />;

    case 19:
      return <Callout {...props} />;

    case 22:
      return <Divider {...props} />;

    case 24:
      return <Tabs {...props} />;

    case 27:
      return <Image {...props} />;

    case 30:
      return <Sheet {...props} />;

    case 31:
      return <Table {...props} />;

    case 32:
      return <TableCell {...props} />;

    case 34:
      return <Quote {...props} />;

    case 42:
      return <ChildPages {...props} />;

    case 999:
      return <Synched {...props} />;

    default:
      return <></>;
  }
}
