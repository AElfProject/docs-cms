import Link from "next/link";
import Image from "next/image";
import { getMenu } from "../lib/utils";
import {
  getNodeToken,
  getRecord,
  getTables,
  NodesItem,
} from "../services/larkServices";

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
  // console.log(menu, "menu");
  const nodes = await getNodeToken();
  const appToken = nodes.items.find((ele: NodesItem) => {
    return ele.title === "Configurations" && ele.obj_type === "bitable";
  })?.obj_token;
  // get table id
  const tableId = (await getTables(appToken!)).items?.[0].table_id;
  // get record
  const record = (await getRecord(appToken!, tableId)).items;
  const config = record.filter(ele => {
    return ele.fields.key;
  });
  let configObj: { [key: string]: any } = {};
  config.forEach(ele => {
    configObj[ele.fields.key!] = ele.fields.value;
  });
  return (
    <main className="p-8">
      <div className="p-[0 6 6] bg-white">
        <div className="relative w-full h-[322px] mb-6">
          <Image
            src={configObj.image}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{configObj.title}</h1>
        <p className="text-gray-700">{configObj.description}</p>
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {menu.items.map(ele => {
          return (
            <ul key={ele.node_token} className="m-4 list-disc">
              <h2 className="font-bold text-[20px] mb-4 ">
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
