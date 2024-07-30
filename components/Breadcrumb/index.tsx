"use client";
import { useEffect, useState } from "react";
import { NodesData } from "../../services/larkServices";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import {
  findTopLevelItems,
  findPathByKey,
  findKeyInData,
  formatStringArray,
  findPathByTitles,
  findTitlesById,
} from "../../lib/utils";
import { Breadcrumb, theme as antdTheme, ConfigProvider } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useTheme } from "next-themes";
import { getThemeConfig } from "../../lib/theme";

interface Props {
  menu: NodesData;
}

const getitemsById = (menu: NodesData, id: string) => {
  let temp: any = {};
  temp.items = findTopLevelItems(menu, id);
  const pathArr = findPathByKey(temp, id);
  return pathArr?.map(ele => {
    const titles = findTitlesById(menu, ele.node_token);
    const url = titles?.join("/");
    let obj: any = {};
    if (ele.node_token !== id) {
      obj.href = `/wiki/${url}`;
    }
    obj.title = ele.title;
    return obj;
  })!;
};
export default function BreadcrumbComponent({ menu }: Props) {
  const params = useParams();
  const titleArr = formatStringArray(params.id as string[]);
  const { lastItemId: id } = findPathByTitles(menu, titleArr);
  const [isKeyInMenu, setisKeyInMenu] = useState(
    findKeyInData(menu, id as string)
  );
  const home = {
    href: "/",
    title: <HomeOutlined />,
  };
  const [items, setItems] = useState([
    home,
    ...getitemsById(menu, id as string),
  ] as ItemType[]);

  useEffect(() => {
    const keyFlag = findKeyInData(menu, id as string);
    setisKeyInMenu(keyFlag);
    if (keyFlag) {
      const itemList = getitemsById(menu, id as string);
      setItems([home, ...itemList]);
    }
  }, [id]);

  // for dark mode
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }
  return (
    <>
      {isKeyInMenu ? (
        <div className="my-4">
          <ConfigProvider
            theme={{
              algorithm: getThemeConfig(theme, [
                antdTheme.defaultAlgorithm,
                antdTheme.darkAlgorithm,
              ]),
            }}
          >
            <Breadcrumb items={items}></Breadcrumb>
          </ConfigProvider>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
