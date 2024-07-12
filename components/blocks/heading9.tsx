import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading9 extends Item {
  block_type: 11;
  heading9: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading9(props: Heading9) {
  return (
    <h6 className="text-base font-semibold tracking-tight">
      {props.heading9.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h6>
  );
}
