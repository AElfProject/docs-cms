import { getChildNodes } from "./get-child-nodes";

export async function getTopLevelNodes() {
  return await getChildNodes("");
}
