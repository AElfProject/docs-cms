import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading2 extends Item {
  block_type: 4;
  heading2: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading2(props: Heading2) {
  return (
    <h2 className="text-5xl font-bold tracking-tight">
      {props.heading2.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h2>
  );
}
