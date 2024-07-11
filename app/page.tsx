import Link from "next/link";
import { getMenu } from "../lib/utils";
import { NodesItem } from "../services/larkServices";

const getChildList = (ele: NodesItem, index: number) => {
  index++;
  return ele.children.map(element => {
    return element.items.map(item => {
      return (
        <li>
          <Link href={`/node/${item.node_token}`} className="text-blue-500">
            {item.title}
          </Link>
          <ul className="list-[circle] pl-4">
            {index <= 2 && getChildList(item, index)}
          </ul>
        </li>
      );
    });
  });
};
export default async function Home() {
  const menu = await getMenu();
  return (
    <main className="p-8">
      <div className="flex flex-wrap">
        {menu.items.map(ele => {
          return (
            <ul key={ele.node_token} className="w-1/3 p-4 list-disc pl-2">
              <h2 className="font-bold text-xl mb-4">
                <Link href={`/node/${ele.node_token}`}>{ele.title}</Link>
              </h2>
              {ele.has_child && getChildList(ele, 0)}
            </ul>
          );
        })}
      </div>
    </main>
  );
}
