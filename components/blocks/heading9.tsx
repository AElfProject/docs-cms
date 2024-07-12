import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading9 extends Item {
  block_type: 11;
  heading9: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading9(props: Heading9) {
  const anchor = props.slugger.slug(
    props.heading9.elements.map((i) => i.text_run.content).join(" ")
  );

  return (
    <h6 className="text-base font-semibold tracking-tight" id={anchor}>
      {props.heading9.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h6>
  );
}
