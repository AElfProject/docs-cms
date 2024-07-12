import { getTenantAccessToken } from "../services/larkServices";

export const fetcher = async (url: string) => {
  const tenantAccessToken = await getTenantAccessToken();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tenantAccessToken}`,
    },
    next: { revalidate: 6000 },
  });
  return res.json();
};
