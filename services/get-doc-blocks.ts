import { AnyItem } from "@/components/blocks/renderer";
import { fetcher } from "@/lib/api";

export async function getDocBlocks(id: string) {
  const {
    data: { items },
  } = await fetcher(
    `https://open.larksuite.com/open-apis/docx/v1/documents/${id}/blocks?document_revision_id=-1&page_size=500`,
    { tags: [id] }
  );

  return items as AnyItem[];
}
