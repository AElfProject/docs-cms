import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading6 extends Item {
  block_type: 8;
  heading6: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading6(props: Heading6) {
  const anchor = props.slugger.slug(
    props.heading6.elements.map((i) => i.text_run.content).join(" ")
  );

  return (
    <h6 className="text-base font-bold tracking-tight" id={anchor}>
      {props.heading6.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h6>
  );
}
