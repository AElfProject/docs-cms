import { useParams } from "next/navigation";
import { Server } from "./server";

export function Client() {
  const params = useParams();
  const { id } = params;

  if (typeof id !== "string") return <></>;

  return <Server id={id} />;
}
