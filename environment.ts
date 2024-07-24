// import { unstable_noStore as noStore } from "next/cache";

function environment(key: string) {
  // noStore();

  const variable = process.env[key];

  if (!variable) throw new Error(`${key} missing in environment.`);

  return variable;
}

export function APP_ID() {
  return environment("APP_ID");
}

export function APP_SECRET() {
  return environment("APP_SECRET");
}

export function SPACE_ID() {
  return environment("SPACE_ID");
}

export function SITE_URL() {
  return environment("NEXT_PUBLIC_SITE_URL");
}
