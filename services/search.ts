"use server";
import { z } from "zod";

import { getTenantAccessToken } from "@/services/get-tenant-access-token";

const schema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    items: z.array(
      z.object({
        node_id: z.string(),
        space_id: z.string(),
        parent_id: z.string(),
        obj_type: z.string(),
        title: z.string(),
        url: z.string(),
        icon: z.string(),
        area_id: z.string(),
        sort_id: z.string(),
        domain: z.string(),
        obj_token: z.string(),
      })
    ),
  }),
});

export const search = async (query: string) => {
  const tenantAccessToken = await getTenantAccessToken();
  const res = await fetch(
    `https://open.larksuite.com/open-apis/wiki/v1/nodes/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tenantAccessToken}`,
      },
      body: JSON.stringify({
        query,
        space_id: process.env.SPACE_ID,
        page_size: 20,
      }),
    }
  );

  const {
    data: { items },
  } = schema.parse(res.json());

  return items;
};
