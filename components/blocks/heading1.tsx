import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Heading1 extends Item {
  block_type: 3;
  heading1: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading1(props: Heading1) {
  return (
    <h1 className="text-6xl font-bold tracking-tight">
      {props.heading1.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </h1>
  );
}
