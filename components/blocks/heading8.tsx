import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading8 extends Item {
  block_type: 10;
  heading8: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading8(props: Heading8) {
  return (
    <h6 className="text-base font-semibold tracking-tight">
      {props.heading8.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h6>
  );
}
