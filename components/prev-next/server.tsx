import { getNextNode } from "@/services/get-next-node";
import { getPreviousNode } from "@/services/get-previous-node";
import Link from "next/link";

export async function Server({ id }: { id: string }) {
  const prevNode = await getPreviousNode(id);
  const nextNode = await getNextNode(id);

  return (
    <div className="flex py-8">
      {prevNode ? (
        <Link
          href={`/node/${prevNode.node_token}`}
          className="flex-1 p-4 rounded-lg border-2 border-gray-100 h-24 hover:border-black text-left"
        >
          Previous
          <br />
          <span className="font-bold">« {prevNode.title}</span>
        </Link>
      ) : (
        <div className="flex-1"></div>
      )}
      <div className="w-8"></div>
      {nextNode ? (
        <Link
          href={`/node/${nextNode.node_token}`}
          className="flex-1 p-4 rounded-lg border-2 border-gray-100 h-24 hover:border-black text-right"
        >
          Next
          <br />
          <span className="font-bold">{nextNode.title} »</span>
        </Link>
      ) : (
        <div className="flex-1"></div>
      )}
    </div>
  );
}
