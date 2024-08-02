import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import { Anchor } from "./anchor";

export interface Heading3 extends Item {
  block_type: 5;
  heading3: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Heading3(props: Heading3) {
  const anchor = props.slugger.slug(
    props.heading3.elements.map(i => i.text_run.content).join(" ")
  );

  return (
    <h3
      className="font-bold tracking-tight mt-[1.5rem] mb-[1rem] text-[24px] leading-[30px]"
      id={anchor}
    >
      {props.heading3.elements.map(i => (
        <Element key={key()} {...i} />
      ))}
      <Anchor anchor={anchor} />
    </h3>
  );
}
