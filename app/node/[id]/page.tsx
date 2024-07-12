import Renderer, { AnyItem } from "@/components/blocks/renderer";

interface NodeData {
  node: {
    creator: string;
    has_child: boolean;
    node_create_time: string;
    node_creator: string;
    node_token: string;
    node_type: string;
    obj_create_time: string;
    obj_edit_time: string;
    obj_token: string;
    obj_type: string;
    origin_node_token: string;
    origin_space_id: string;
    owner: string;
    parent_node_token: string;
    space_id: string;
    title: string;
  };
}

interface DocData {
  has_more: boolean;
  items: AnyItem[];
}

async function getData(id: string) {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/wiki/v2/spaces/get_node?obj_type=wiki&token=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
      // next: { revalidate: 1 },
    }
  );

  const { data } = await res.json();

  const node = data as NodeData;

  if (node?.node?.obj_type === "docx") {
    const id = node.node.obj_token;

    const res = await fetch(
      `https://open.larksuite.com/open-apis/docx/v1/documents/${id}/blocks?document_revision_id=-1&page_size=500`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.USER_TOKEN}`,
        },
        // next: { revalidate: 1 },
      }
    );

    const { data } = await res.json();
    return data as DocData;
  } else {
    throw new Error("not supported");
  }
}

export default async function Document({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData(id);

  return (
    <main>
      {data?.items.map((item: AnyItem) => (
        <Renderer key={item.block_id} {...item} allItems={data.items} />
      ))}
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-5">
          For developer use, only visible in development <br />
          {JSON.stringify(data.items, undefined, 2)}
        </pre>
      )}
    </main>
  );
}
