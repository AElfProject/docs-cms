import { AnyItem } from "@/components/blocks/renderer";
import { fetcher } from "@/lib/api";

export async function getDocBlocks(id: string) {
  return await fetchNextPage(id, "");
}

async function fetchNextPage(
  id: string,
  pageToken: string,
  acc: AnyItem[] = []
) {
  const {
    data: { items, has_more, page_token },
  } = await fetcher(
    `https://open.larksuite.com/open-apis/docx/v1/documents/${id}/blocks?document_revision_id=-1&page_size=500&page_token=${pageToken}`,
    { tags: [id] }
  );

  acc.push(...items);

  if (has_more) return await fetchNextPage(id, page_token, acc);

  return acc;
}