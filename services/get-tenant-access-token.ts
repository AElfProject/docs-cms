"use server";

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
      next: { revalidate: 360 },
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
