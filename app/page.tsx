import Link from "next/link";
import Image from "next/image";
import { getConfigContent, getMenu, toKebabCase } from "../lib/utils";
import {
  getNodeToken,
  getRecord,
  getTables,
  NodesItem,
} from "../services/larkServices";

const getChildList = (ele: NodesItem, index: number, url: string = "") => {
  index++;
  return ele.children.map(element => {
    return element.items.map(item => {
      const newUrl = `${url}/${toKebabCase(item.title)}`;
      return (
        <li className="ml-4" key={item.node_token}>
          <Link href={newUrl} className="text-blue-500">
            {item.title}
          </Link>
          {/* <ul className="list-[circle] pl-4">
            {index <= 2 && getChildList(item, index, newUrl)}
          </ul> */}
        </li>
      );
    });
  });
};

export default async function Home() {
  const menu = await getMenu();
  const nodes = await getNodeToken();
  const appToken = nodes.items.find((ele: NodesItem) => {
    return ele.title === "Configurations" && ele.obj_type === "bitable";
  })?.obj_token;
  const configObj: { [key: string]: any } = appToken
    ? await getConfigContent(appToken, "Base")
    : {};
  const emojiObj = appToken ? await getConfigContent(appToken, "Emoji") : {};
  return (
    <main className="pt-8 container min-h-[calc(100vh-225px)]">
      <div className="sm:mt-[60px] mt-10 bg-white">
        <div className="relative w-full sm:h-[322px] h-[82px] mb-6">
          <Image
            src={configObj.image}
            alt="Banner Image"
            layout="fill"
            objectFit="fill"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{configObj.title}</h1>
        <p className="text-gray-700">{configObj.description}</p>
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 mb-16">
        {menu.items.map(ele => {
          const url = `/wiki/${toKebabCase(ele.title)}`;
          return (
            <ul key={ele.node_token} className="m-4 list-disc">
              <h2 className="font-bold text-[20px] mb-4 ">
                {emojiObj[ele.title] && (
                  <span className="mr-2">{emojiObj[ele.title]}</span>
                )}
                <Link href={`/wiki/${toKebabCase(ele.title)}`}>
                  {ele.title}
                </Link>
              </h2>
              {ele.has_child && getChildList(ele, 0, url)}
            </ul>
          );
        })}
      </div>
    </main>
  );
}
