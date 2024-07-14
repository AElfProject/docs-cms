import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading5 extends Item {
  block_type: 7;
  heading5: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading5(props: Heading5) {
  const anchor = props.slugger.slug(
    props.heading5.elements.map((i) => i.text_run.content).join(" ")
  );

  return (
    <h5 className="text-lg font-bold tracking-tight" id={anchor}>
      {props.heading5.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h5>
  );
}
