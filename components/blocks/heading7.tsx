import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading7 extends Item {
  block_type: 9;
  heading7: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading7(props: Heading7) {
  const anchor = props.slugger.slug(
    props.heading7.elements.map((i) => i.text_run.content).join(" ")
  );

  return (
    <h6 className="text-base font-semibold tracking-tight" id={anchor}>
      {props.heading7.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h6>
  );
}
