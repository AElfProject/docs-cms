"use client";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Image from "next/image";
import { NodesData } from "../services/larkServices";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { findTopLevelItems } from "../lib/utils";

interface Props {
  menu: NodesData;
}
type MenuItem = Required<MenuProps>["items"][number];

export default function Header({ menu }: Props) {
  const params = useParams();
  const { id } = params;
  let temp: any = {};
  temp.items = findTopLevelItems(menu, id as string);
  const items = menu.items;
  const menuItems: MenuItem[] = items.map(ele => {
    let obj: any = {};
    obj.label = (
      <Link href={`/node/${ele.node_token}`} className="font-bold">
        {ele.title}
      </Link>
    );
    obj.key = ele.node_token;
    return obj;
  });
  const [current, setCurrent] = useState(
    temp.items && temp.items[0]?.node_token
  );
  const onClick: MenuProps["onClick"] = e => {
    setCurrent(e.key);
  };
  return (
    <div className="fixed w-full bg-white z-50 flex mx-5">
      <Link href="/" className="mr-8 flex">
        <Image src="./aelf-logo.svg" width={115} height={32} alt="logo"></Image>
      </Link>
      <Menu
        className="w-full"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
    </div>
  );
}
