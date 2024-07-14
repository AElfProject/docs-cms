import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading4 extends Item {
  block_type: 6;
  heading4: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading4(props: Heading4) {
  const anchor = props.slugger.slug(
    props.heading4.elements.map((i) => i.text_run.content).join(" ")
  );

  return (
    <h4 className="text-xl font-bold tracking-tight" id={anchor}>
      {props.heading4.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h4>
  );
}
