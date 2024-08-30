import { Item, Element } from "./common";
import CodeBlock from "@/components/code/index";

export interface Code extends Item {
  block_type: 14;
  code: {
    elements: Array<Element>;
    style: {
      language: number;
      wrap: boolean;
    };
  };
}

export function Code(props: Code) {
  return (
    <CodeBlock
      code={props.code.elements.map(i => i.text_run.content).join("")}
      language={props.code.style.language}
    />
  );
}
