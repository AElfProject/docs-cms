import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading2 extends Item {
  block_type: 4;
  heading2: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading2(props: Heading2) {
  const anchor = props.slugger.slug(
    props.heading2.elements.map(i => i.text_run.content).join(" ")
  );

  return (
    <h2
      className="font-bold tracking-tight mt-[1.5rem] mb-[1rem] text-[24px] leading-10"
      id={anchor}
    >
      {props.heading2.elements.map(i => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h2>
  );
}
