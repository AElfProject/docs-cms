import { fetcher } from "../lib/api";

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
    `https://open.larksuite.com/open-apis/wiki/v2/spaces/${
      process.env.SPACE_ID
    }/nodes?parent_node_token=${token ? token : ""}`
  );
  const { data } = res;
  return data as NodesData;
}

export async function getTenantAccessToken() {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        app_id: process.env.APP_ID,
        app_secret: process.env.APP_SECRET,
      }),
    }
  );
  const data: {
    code: number;
    msg: string;
    tenant_access_token: string;
    expire: number;
  } = await res.json();
  if (data.code !== 0) {
    throw new Error("Unable to get tenant access token.");
  }
  return data.tenant_access_token;
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
  };
  id: string;
  record_id: string;
}
export async function getRecord(app_token: string, table_id: string) {
  const res = await fetcher(`	
https://open.larksuite.com/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records`);
  const { data } = res;
  return data as ResponseData<RecordItem>;
}
