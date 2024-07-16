"use client";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Image from "next/image";
import { NodesData } from "../services/larkServices";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  findPathByTitles,
  findTitlesById,
  findTopLevelItems,
  formatStringArray,
} from "../lib/utils";
import Search from "./search";

interface Props {
  menu: NodesData;
}
type MenuItem = Required<MenuProps>["items"][number];

export default function Header({ menu }: Props) {
  const params = useParams();
  const titleArr = formatStringArray(params.id as string[]);
  const { lastItemId: id } = findPathByTitles(menu, titleArr);
  let temp: any = {};
  temp.items = findTopLevelItems(menu, id as string);
  const items = menu.items;
  const menuItems: MenuItem[] = items.map(ele => {
    const titles = findTitlesById(menu, ele.node_token);
    const url = titles?.join("/");
    let obj: any = {};
    obj.label = (
      <Link href={`/wiki/${url}`} className="font-bold">
        {ele.title}
      </Link>
    );
    obj.key = ele.node_token;
    return obj;
  });
  const [current, setCurrent] = useState(
    temp.items && temp.items[0]?.node_token
  );
  useEffect(() => {
    setCurrent(temp.items && temp.items[0]?.node_token);
  }, [id]);
  const onClick: MenuProps["onClick"] = e => {
    setCurrent(e.key);
  };

  return (
    <div className="fixed w-full bg-white z-50 flex px-5 h-[60px]">
      <Link href="/" className="mr-8 flex">
        <Image src="/aelf-logo.svg" width={115} height={32} alt="logo"></Image>
      </Link>
      <Menu
        className="w-full flex items-center"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end mr-12">
        <Search />
      </div>
    </div>
  );
}
