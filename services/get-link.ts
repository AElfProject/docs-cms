import { fetcher } from "@/lib/api";

export async function getLink(token: string) {
  const { data } = await fetcher(
    `https://open.larksuite.com/open-apis/drive/v1/medias/batch_get_tmp_download_url?file_tokens=${token}`,
    { tags: [token] }
  );

  return data.tmp_download_urls?.[0]?.tmp_download_url;
}
