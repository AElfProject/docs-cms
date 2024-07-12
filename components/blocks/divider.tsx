import { Item } from "./common";
import { Separator } from "@/components/ui/separator";

export interface Divider extends Item {
  block_type: 22;
}

export function Divider(_props: Divider) {
  return <Separator />;
}
