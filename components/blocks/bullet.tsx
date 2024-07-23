import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";
import Renderer from "./renderer";

export interface Bullet extends Item {
  block_type: 12;
  bullet: {
    elements: Array<Element>;
    style: TextStyle;
  };
  children?: string[];
}

export function Bullet(props: Bullet) {
  return (
    <li>
      {props.bullet.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
      {props.children ? (
        <ul>
          {props.allItems
            .filter((i) => props.children?.includes(i.block_id))
            .map((j) => (
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
