import { Item, TextStyle, Element } from "./common";
import { key } from "@/lib/utils";
export interface Text extends Item {
  block_type: 2;
  text: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Text(props: Text) {
  return (
    <p className="leading-7 mb-5">
      {props.text.elements.map(i => (
        <Element key={key()} {...i} />
      ))}
    </p>
  );
}
