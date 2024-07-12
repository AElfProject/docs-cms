import { getTenantAccessToken } from "../app/api/token/route";

export const fetcher = async (url: string) => {
  const tenantAccessToken = await getTenantAccessToken();
  console.log(tenantAccessToken, "tenantAccessToken");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tenantAccessToken}`,
    },
    next: { revalidate: 1 },
  });
  return res.json();
};
