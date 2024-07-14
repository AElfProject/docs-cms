"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

async function getAppAccessToken() {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal`,
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
    app_access_token: string;
    expire: number;
  } = await res.json();

  if (data.code !== 0) {
    throw new Error("Unable to get app access token.");
  }

  return data.app_access_token;
}
async function getUserAccessToken(code: string) {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/authen/v1/oidc/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${await getAppAccessToken()}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
      }),
    }
  );

  const data: {
    code: number;
    msg: string;
    data: {
      access_token: string;
      refresh_token: string;
      token_type: "Bearer";
      expires_in: number;
      refresh_expires_in: number;
      scope: string;
    };
  } = await res.json();

  if (data.code !== 0) {
    throw new Error("Unable to get user access token.");
  }

  return data.data.access_token;
}

type SessionTokenData = {
  token: string;
};

async function getIronSessionData<T extends object>() {
  const session = await getIronSession<T>(cookies(), {
    password: `${process.env.COOKIE_PASSWORD}`,
    cookieName: `${process.env.COOKIE_NAME}`,
  });
  return session;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    throw new Error("no code in search params");
  }
  // get user token by code
  const data = await getUserAccessToken(code);
  // save in session
  const session = await getIronSessionData<SessionTokenData>();
  session.token = data;
  await session.save();
  return Response.json({ token: data });
}
