import { SPACE_ID } from "@/environment";
import { getLink } from "../components/blocks/image";
import { fetcher } from "../lib/api";
import { getFileTokens } from "../lib/utils";

export interface NodesData {
  has_more: boolean;
  items: NodesItem[];
  page_token: string;
}

export interface NodesItem {
  creator: string;
  has_child: boolean;
  node_create_time: string;
  // wiki token
  node_token: string;
  node_type: string;
  obj_create_time: string;
  obj_edit_time: string;
  // docs token
  obj_token: string;
  obj_type: string;
  origin_node_token: string;
  origin_space_id: string;
  owner: string;
  parent_node_token: string;
  space_id: string;
  title: string;
  children: NodesData[];
}
// get the list of child nodes
export async function getNodeToken(token?: string) {
  const res = await fetcher(
    `https://open.larksuite.com/open-apis/wiki/v2/spaces/${SPACE_ID()}/nodes?parent_node_token=${
      token ? token : ""
    }`,
    { tags: [`getNodeToken-${token || "root"}`] }
  );
  const { data } = res;
  return data as NodesData;
}

interface ResponseData<T> {
  has_more: boolean;
  items: T[];
  page_token: string;
  total: number;
}
interface TableItem {
  name: string;
  revision: number;
  table_id: string;
}
export async function getTables(app_token: string) {
  const res = await fetcher(
    `https://open.larksuite.com/open-apis/bitable/v1/apps/${app_token}/tables`
  );
  const { data } = res;
  return data as ResponseData<TableItem>;
}
interface RecordItem {
  fields: {
    key?: string;
    value?: string;
    image?: {
      file_token: string;
      name: string;
      size: number;
      tmp_url: string;
      type: string;
      url: string;
    }[];
  };
  id: string;
  record_id: string;
}
export async function getRecord(app_token: string, table_id: string) {
  const res = await fetcher(`	
https://open.larksuite.com/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records`);
  const { data } = res;
  if (!data) return;
  for (const ele of data.items) {
    if (ele.fields.image) {
      const url = ele.fields.image[0].tmp_url;
      const token = getFileTokens(url);
      const link = await getLink(token!);
      ele.fields.value = link;
    }
  }
  return data as ResponseData<RecordItem>;
}
