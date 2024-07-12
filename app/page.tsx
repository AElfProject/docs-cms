import Link from "next/link";
import { getMenu } from "../lib/utils";
import { NodesItem } from "../services/larkServices";

const getChildList = (ele: NodesItem, index: number) => {
  index++;
  return ele.children.map(element => {
    return element.items.map(item => {
      return (
        <li className="ml-4" key={item.node_token}>
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
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {menu.items.map(ele => {
          return (
            <ul key={ele.node_token} className="m-4 list-disc ">
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
