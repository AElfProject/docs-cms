import { Item } from "./common";
import Renderer from "./renderer";

export interface Synched extends Item {
  block_type: 999;
  children?: string[];
  undefined: {};
}

export function Synched(props: Synched) {
  const allChildren = props.allItems.filter((i) =>
    props.children?.includes(i.block_id)
  );

  return (
    <>
      {allChildren.map((i) => (
        <Renderer key={i.block_id} {...i} allItems={props.allItems} nested />
      ))}
    </>
  );
}
