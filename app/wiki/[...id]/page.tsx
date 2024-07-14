import Renderer, { AnyItem } from "@/components/blocks/renderer";
import GithubSlugger from "github-slugger";
import { redirect } from "next/navigation";
import TableOfContents from "@/components/blocks/table-of-contents";
import {
  findPathByTitles,
  formatStringArray,
  getMenu,
} from "../../../lib/utils";
import { PrevNext } from "../../../components/prev-next";
import { getNode } from "@/services/get-node";
import { getDocBlocks } from "@/services/get-doc-blocks";
import Link from "next/link";

interface Props {
  params: {
    id: string[];
  };
}

async function getData(id: string) {
  const {
    data: { node },
  } = await getNode(id);

  if (node.obj_type === "docx") {
    return await getDocBlocks(node.obj_token);
  } else {
    throw new Error("not supported");
  }
}

export default async function Document({ params }: Props) {
  const menu = await getMenu();
  const titleArr = formatStringArray(params.id);
  const { lastItemId: id } = findPathByTitles(menu, titleArr);
  if (!id) {
    redirect("/404");
  }
  const data = await getData(id!);

  const slugger = new GithubSlugger();

  return (
    <main className="flex overflow-x-hidden">
      <div className="w-2/3">
        {data?.map((item: AnyItem) => (
          <Renderer
            key={item.block_id}
            {...item}
            allItems={data}
            slugger={slugger}
          />
        ))}
        <PrevNext />
        {/* {process.env.NODE_ENV === "development" && (
          <pre className="mt-5">
            For developer use, only visible in development <br />
            {JSON.stringify(data.items, undefined, 2)}
          </pre>
        )} */}
        {process.env.NODE_ENV === "development" ? (
          <Link
            href={`/api/revalidate?tag=${id}`}
            className="bg-red-700 text-white rounded-sm p-2 mb-8 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            invalidate page
          </Link>
        ) : null}
      </div>
      <aside className="w-1/3">
        <TableOfContents allItems={data} />
      </aside>
    </main>
  );
}
