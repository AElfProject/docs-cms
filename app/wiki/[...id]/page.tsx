import Renderer, { AnyItem } from "@/components/blocks/renderer";
import GithubSlugger from "github-slugger";
import { redirect } from "next/navigation";
import TableOfContents from "@/components/blocks/table-of-contents";
import {
  findPathByTitles,
  formatStringArray,
  getMenu,
  toKebabCase,
} from "@/lib/utils";
import { PrevNext } from "@/components/prev-next";
import { getNode } from "@/services/get-node";
import { getDocBlocks } from "@/services/get-doc-blocks";
import { revalidateTag } from "next/cache";
import { FormLoading } from "@/components/form-loading";
import { DateModified } from "@/components/date-modified";
import { Admin } from "@/components/admin";
import { NodesData } from "@/services/larkServices";
import { headers } from "next/headers";
import { isMobile } from "../../../lib/isMobile";
import { Collapse, ConfigProvider } from "antd";
interface Props {
  params: {
    id: string[];
  };
}

async function getData(id: string) {
  const node = await getNode(id);

  if (node.obj_type === "docx") {
    return {
      data: await getDocBlocks(node.obj_token),
      docx_token: node.obj_token,
      edit_time: node.obj_edit_time,
    };
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
  const { data, docx_token, edit_time } = await getData(id!);

  const slugger = new GithubSlugger();

  async function invalidatePage(formData: FormData) {
    "use server";

    const id = formData.get("id");
    if (typeof id === "string") revalidateTag(id);

    const docx_token = formData.get("docx_token");
    if (typeof docx_token === "string") revalidateTag(docx_token);

    console.log("revalidating", id, docx_token);
  }
  const userAgent = headers().get("user-agent") || "";
  const isMobileDevice = isMobile(userAgent);
  const contentItems = [
    {
      key: "1",
      label: "On this page",
      children: <TableOfContents allItems={data} />,
    },
  ];
  const ifShowCollapse = data.filter(i =>
    [3, 4, 5, 6, 7, 8, 9, 10, 11].includes(i.block_type)
  ).length;
  return (
    <main className="flex flex-col-reverse sm:flex-row">
      <div className="sm:w-2/3 w-full">
        {data?.map((item: AnyItem) => (
          <Renderer
            key={item.block_id}
            {...item}
            allItems={data}
            slugger={slugger}
          />
        ))}
        <PrevNext />
        <DateModified date={new Date(Number(edit_time) * 1000)} />
        <Admin>
          <form action={invalidatePage}>
            <input name="id" type="hidden" value={id} />
            <input name="docx_token" type="hidden" value={docx_token} />
            <FormLoading className="bg-red-700 text-white rounded-sm p-2 mb-8 inline-block">
              invalidate page
            </FormLoading>
          </form>
        </Admin>
      </div>
      <aside className="sm:w-1/3 w-full">
        {isMobileDevice ? (
          ifShowCollapse ? (
            <ConfigProvider
              theme={{
                token: {
                  colorLink: "#000",
                },
                components: {
                  Collapse: {
                    contentPadding: "2px",
                  },
                },
              }}
            >
              <Collapse
                className="wiki-collapse-container !mb-4"
                items={contentItems}
              ></Collapse>
            </ConfigProvider>
          ) : null
        ) : (
          <div className="overflow-y-auto max-h-[calc(100vh-60px)] sticky top-20">
            <TableOfContents allItems={data} />
          </div>
        )}
      </aside>
    </main>
  );
}

export async function generateStaticParams() {
  const menu = await getMenu();

  let paths: { id: string[] }[] = [];

  async function getParams(data: NodesData) {
    for (const i of data.items) {
      paths.push({ id: await getPath(i.node_token) });

      if (i.has_child) {
        for (const j of i.children) {
          await getParams(j);
        }
      }
    }
  }

  await getParams(menu);

  return paths;
}

async function getPath(id: string, path: string[] = []) {
  const { parent_node_token, title } = await getNode(id);

  if (parent_node_token) {
    return await getPath(parent_node_token, [toKebabCase(title), ...path]);
  } else {
    return [toKebabCase(title), ...path];
  }
}
