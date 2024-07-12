import { AnyItem } from "./renderer";
import type GithubSlugger from "github-slugger";

export interface Item {
  block_id: string;
  parent_id: string;
  allItems: AnyItem[];
  slugger: GithubSlugger;
}

export interface TextStyle {
  align: number;
  folded: boolean;
}

export { Element } from "./element";