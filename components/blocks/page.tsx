import { Item, Element } from "./common";

export interface Page extends Item {
  block_type: 1;
  children: string[];
  page: {
    elements: Element[];
    style: {
      align: number;
    };
  };
}

export function Page(props: Page) {
  return (
    <h1 className="scroll-m-20 font-extrabold tracking-tight text-[32px] sm:text-[48px] mb-[25px] leading-[30px] sm:leading-[60px]">
      {props.page.elements[0].text_run.content}
    </h1>
  );
}
