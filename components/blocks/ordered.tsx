import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import Renderer from "./renderer";

export interface Ordered extends Item {
  block_type: 13;
  ordered: {
    elements: Array<Element>;
    style: TextStyle;
  };
  children?: string[];
}

export function Ordered(props: Ordered) {
  return (
    <li className="leading-[1.75rem]">
      {props.ordered.elements.map(i => (
        <Element key={key()} {...i} />
      ))}
      {props.children ? (
        <ul>
          {props.allItems
            .filter(i => props.children?.includes(i.block_id))
            .map(j => (
              <Renderer
                key={j.block_id}
                {...j}
                allItems={props.allItems}
                slugger={props.slugger}
                nested
              />
            ))}
        </ul>
      ) : null}
    </li>
  );
}
