import {
  Tabs as TabsLib,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Item } from "./common";
import Renderer, { AnyItem } from "./renderer";

export interface Tabs extends Item {
  block_type: 24;
  children: string[];
  grid: {
    column_size: number;
  };
}

export interface Tab extends Item {
  block_type: 25;
  children: string[];
  grid_column: {
    width_ratio: number;
  };
}

const getFirstItem = (id: string, items: AnyItem[]) => {
  const firstId = (items.find((i) => i.block_id === id) as Tab).children[0];

  const firstItem = items.find((i) => i.block_id === firstId);

  if (firstItem?.block_type === 2) {
    return firstItem;
  }

  return undefined;
};

const getAllTabChildrenExceptFirst = (id: string, items: AnyItem[]) => {
  const allChildren = (items.find((i) => i.block_id === id) as Tab).children;

  const allItems = items
    .filter((i) => allChildren.includes(i.block_id))
    .slice(1);

  return allItems;
};

export function Tabs(props: Tabs) {
  const allChildren = props.allItems.filter((i) =>
    props.children.includes(i.block_id)
  ) as Tab[];

  return (
    <TabsLib
      defaultValue={
        getFirstItem(allChildren[0].block_id, props.allItems)?.text.elements[0]
          .text_run.content || "Tab 0"
      }
      className="mt-8"
    >
      <TabsList>
        {allChildren.map((i, index) => {
          const value =
            getFirstItem(i.block_id, props.allItems)?.text.elements?.[0]
              .text_run.content || `Tab ${index}`;
          return (
            <TabsTrigger key={i.block_id} value={value}>
              {value}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {allChildren.map((i, index) => {
        const allChildren = getAllTabChildrenExceptFirst(
          i.block_id,
          props.allItems
        );
        const value =
          getFirstItem(i.block_id, props.allItems)?.text.elements?.[0].text_run
            .content || `Tab ${index}`;

        return (
          <TabsContent
            key={i.block_id}
            value={value}
            className="rounded-md border p-4 mb-8"
          >
            {allChildren?.map((i) => (
              <Renderer
                key={i.block_id}
                {...i}
                allItems={props.allItems}
                nested
              />
            ))}
          </TabsContent>
        );
      })}
    </TabsLib>
  );
}
