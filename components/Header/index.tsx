"use client";
import type { MenuProps } from "antd";
import { Drawer, Menu, theme as antdTheme, ConfigProvider } from "antd";
import { NodesData, NodesItem } from "../../services/larkServices";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  findPathByTitles,
  findTitlesById,
  findTopLevelItems,
} from "../../lib/utils";
import Search from "../search";
import {
  CloseOutlined,
  GithubOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./index.css";
import Sidebar from "../sidebar";
import { Desktop, Mobile } from "../provider";
import CustomImage from "../customImage";
import ThemeToggler from "../themeToggler";
import { useTheme } from "next-themes";
import { getThemeConfig } from "../../lib/theme";
interface Props {
  menu: NodesData;
  baseConfig: { [key: string]: any };
}
type MenuItem = Required<MenuProps>["items"][number];

export default function Header({ menu, baseConfig }: Props) {
  const params = useParams();
  const { lastItemId: id } = findPathByTitles(menu, params.id as string[]);
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
        className="font-bold text-[15px] px-[1.5rem] py-[0.5rem] bg-card-border-color mx-[-10px]"
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
    <ConfigProvider
      theme={{
        algorithm: getThemeConfig(theme, [
          antdTheme.defaultAlgorithm,
          antdTheme.darkAlgorithm,
        ]),
        token: {
          colorBgContainer: "hsl(var(--background))",
        },
      }}
    >
      <div className="fixed w-full z-50 flex px-5 h-[60px] border-b-[1px] items-center bg-background">
        <Mobile>
          <div
            className="flex w-[30px] mr-2"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuFoldOutlined
              width={"30px"}
              height={"30px"}
              className="text-[30px] !text-primary"
            />
          </div>
        </Mobile>
        <Drawer
          className="header-drawer-container"
          title={
            <CustomImage
              src={getThemeConfig(theme, [
                baseConfig.logoLight,
                baseConfig.logoDark,
              ])}
              width={115}
              height={59}
              alt="logo"
            ></CustomImage>
          }
          closeIcon={false}
          extra={
            <CloseOutlined
              width={"30px"}
              height={"30px"}
              className="text-[30px] !text-primary"
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
          <CustomImage
            src={getThemeConfig(theme, [
              baseConfig.logoLight,
              baseConfig.logoDark,
            ])}
            width={115}
            height={32}
            alt="logo"
          ></CustomImage>
        </Link>
        <Desktop>
          <Menu
            className="w-full flex items-center header-menu"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={menuItems}
          />
        </Desktop>
        <div className="flex items-center space-x-4 justify-end md:mr-5">
          {baseConfig.blog && (
            <a
              href={baseConfig.blog}
              target="_blank"
              className="hover:text-blue-500 text-[18px]"
            >
              Blog
            </a>
          )}
          {baseConfig.github && (
            <a href={baseConfig.github} target="_blank">
              <GithubOutlined className="text-[18px] hover:text-blue-500" />
            </a>
          )}
          <ThemeToggler />
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <Search />
        </div>
      </div>
    </ConfigProvider>
  );
}
