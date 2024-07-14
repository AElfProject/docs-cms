import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading1 extends Item {
  block_type: 3;
  heading1: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading1(props: Heading1) {
  const anchor = props.slugger.slug(
    props.heading1.elements.map((i) => i.text_run.content).join(" ")
  );

  return (
    <h1 className="text-4xl font-bold tracking-tight my-4" id={anchor}>
      {props.heading1.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h1>
  );
}
