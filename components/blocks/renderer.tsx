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

export type AnyItem =
  | Code
  | Text
  | Heading1
  | Heading2
  | Heading3
  | Heading4
  | Ordered
  | Bullet
  | Quote
  | Page
  | Image;

export default function Renderer(props: AnyItem & { allItems: AnyItem[] }) {
  const first = props.allItems[0];
  if (first.block_type === 1 && props.block_id !== first.block_id) {
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

    case 12:
      return <Bullet {...props} />;

    case 13:
      return <Ordered {...props} />;

    case 14:
      return <Code {...props} />;

    case 27:
      return <Image {...props} />;

    case 34:
      return <Quote {...props} />;

    default:
      return <></>;
  }
}
