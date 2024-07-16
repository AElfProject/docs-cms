"use server";

import { key } from "@/lib/utils";
import { Item } from "./common";
import { getChildNodes } from "@/services/get-child-nodes";
import { getPath } from "@/services/get-path";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ChildPages extends Item {
  block_type: 42;
  wiki_catalog: {
    wiki_token: string;
  };
}

interface LinkItem {
  title: string;
  href: string;
}

async function getData(id: string) {
  const nodes = await getChildNodes(id);

  const { items } = nodes.data;

  let links: LinkItem[] = [];

  for (const item of items) {
    links.push({
      title: item.title,
      href: await getPath(item.node_token),
    });
  }

  return links;
}

export async function ChildPages(props: ChildPages) {
  const data = await getData(props.wiki_catalog.wiki_token);
  return (
    <div className="grid lg:grid-cols-2 gap-2 my-8">
      {data.map(i => (
        <Link key={key()} href={i.href}>
          <Card className="hover:border-black h-full">
            <CardHeader>
              <CardTitle>{i.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
