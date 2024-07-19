"use client";
import type { MenuProps } from "antd";
import { Drawer, Menu } from "antd";
import Image from "next/image";
import { NodesData, NodesItem } from "../../services/larkServices";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  findPathByTitles,
  findTitlesById,
  findTopLevelItems,
  formatStringArray,
} from "../../lib/utils";
import Search from "../search";
import { CloseOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./index.css";
import Sidebar from "../sidebar";
interface Props {
  menu: NodesData;
  isMobileDevice: boolean;
}
type MenuItem = Required<MenuProps>["items"][number];

export default function Header({ menu, isMobileDevice }: Props) {
  const params = useParams();
  const titleArr = formatStringArray(params.id as string[]);
  const { lastItemId: id } = findPathByTitles(menu, titleArr);
  let temp: any = {};
  temp.items = findTopLevelItems(menu, id as string) as NodesItem[];
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showHome, setShowHome] = useState(!id);
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const drawerContent = (
    <div className="wiki-drawer-content">
      <div
        onClick={() => setShowHome(true)}
        className="font-bold text-[15px] px-[1.5rem] py-[0.5rem] bg-[#ebedf0] mx-[-10px]"
      >
        ← Back to main menu
      </div>
      <Sidebar menu={menu} closeDrawer={closeDrawer}></Sidebar>
    </div>
  );
  const homeDrawerContent = (
    <div className="home-drawer-content">
      {menu.items.map(item => {
        const titles = findTitlesById(menu, item.node_token);
        const url = titles?.join("/");
        return (
          <div
            key={item.node_token}
            className="px-3 py-[6px] text-lg"
            onClick={() => setDrawerOpen(false)}
          >
            <Link href={`/wiki/${url}`}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className="fixed w-full bg-white z-50 flex px-5 h-[60px] border-b-[1px] items-center">
      {isMobileDevice && (
        <div className="flex w-[30px] mr-2" onClick={() => setDrawerOpen(true)}>
          <MenuFoldOutlined
            width={"30px"}
            height={"30px"}
            className="text-[30px] !text-[#1c1e21]"
          />
        </div>
      )}
      <Drawer
        className="header-drawer-container"
        title={
          <Image
            src="/aelf-logo.svg"
            width={115}
            height={59}
            alt="logo"
          ></Image>
        }
        closeIcon={false}
        extra={
          <CloseOutlined
            width={"30px"}
            height={"30px"}
            className="text-[30px] !text-[#1c1e21]"
            onClick={() => {
              setDrawerOpen(false);
              setShowHome(!id);
            }}
          />
        }
        open={drawerOpen}
        placement="left"
      >
        {showHome ? homeDrawerContent : drawerContent}
      </Drawer>
      <Link href="/" className="mr-8 flex">
        <Image src="/aelf-logo.svg" width={115} height={32} alt="logo"></Image>
      </Link>
      {!isMobileDevice && (
        <Menu
          className="w-full flex items-center"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
        />
      )}
      <div className="flex flex-1 items-center space-x-2 justify-end md:mr-12">
        <Search />
      </div>
    </div>
  );
}
