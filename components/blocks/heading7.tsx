import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading7 extends Item {
  block_type: 9;
  heading7: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading7(props: Heading7) {
  return (
    <h6 className="text-lg font-semibold tracking-tight">
      {props.heading7.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h6>
  );
}
