import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading6 extends Item {
  block_type: 8;
  heading6: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading6(props: Heading6) {
  return (
    <h6 className="text-xl font-bold tracking-tight">
      {props.heading6.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h6>
  );
}
