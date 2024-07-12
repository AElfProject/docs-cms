import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading5 extends Item {
  block_type: 7;
  heading5: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading5(props: Heading5) {
  return (
    <h5 className="text-2xl font-bold tracking-tight">
      {props.heading5.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h5>
  );
}
