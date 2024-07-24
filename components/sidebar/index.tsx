"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Menu, ConfigProvider } from "antd";
import { NodesData, NodesItem } from "../../services/larkServices";
import { useEffect, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";
import {
  findKeyInData,
  findPathByKey,
  findPathByTitles,
  findTitlesById,
  findTopLevelItems,
  formatStringArray,
} from "../../lib/utils";
import "./index.css";

interface Props {
  menu: NodesData;
  closeDrawer?: () => void;
}

const MenuItem = ({ item }: { item: NodesItem }) => {
  return (
    <li>
      {item.title}
      {item.has_child && item.children?.length > 0 && (
        <ul>
          {item.children.map(ele => {
            return ele.items.map(element => {
              return <MenuItem key={element.node_token} item={element} />;
            });
          })}
        </ul>
      )}
    </li>
  );
};

type MenuItem = Required<MenuProps>["items"][number];
export default function Sidebar({ menu, closeDrawer = () => {} }: Props) {
  const params = useParams();
  const titleArr = formatStringArray(params.id as string[]);
  const { lastItemId: id } = findPathByTitles(menu, titleArr);
  const [isKeyInMenu, setisKeyInMenu] = useState(
    findKeyInData(menu, id as string)
  );
  let temp: any = {};
  temp.items = findTopLevelItems(menu, id as string);
  const [openKeys, setOpenKeys] = useState(
    findPathByKey(temp, id as string)?.map(ele => ele.node_token)
  );
  // click icon to open or close submenu
  const onIconClick = ({ key }: { key: string }) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter(openKey => openKey !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };
  // not use the original open/close
  const renderTitle = (title: string, key: string, hasChild: boolean) => {
    const titles = findTitlesById(menu, key);
    const url = titles?.join("/");
    return (
      <div className="flex items-center justify-between">
        <Link
          href={`/wiki/${url}`}
          className="w-[90%]"
          onClick={() => closeDrawer()}
        >
          <span>{title}</span>
        </Link>
        {hasChild &&
          (openKeys.includes(key) ? (
            <DownOutlined
              onClick={e => {
                e.stopPropagation();
                onIconClick({ key });
              }}
            />
          ) : (
            <RightOutlined
              onClick={e => {
                e.stopPropagation();
                onIconClick({ key });
              }}
            />
          ))}
      </div>
    );
  };

  // convert to menu items format
  const getMenuList = (data: NodesData) => {
    const items = data?.items;
    const arr = [];
    for (let i = 0; i < items?.length; i++) {
      let obj: any = {
        key: items[i].node_token,
        label: renderTitle(
          items[i].title,
          items[i].node_token,
          items[i].has_child
        ),
      };
      if (!items[i].children.length) {
        obj.children = null;
      }
      for (let j = 0; j < items[i].children.length; j++) {
        obj.children = getMenuList(items[i].children[j]);
      }
      arr.push(obj);
    }
    return arr;
  };
  const menuItems: MenuItem[] = getMenuList(temp);

  useEffect(() => {
    const keyFlag = findKeyInData(menu, id as string);
    setisKeyInMenu(keyFlag);
    if (keyFlag) {
      const defaultOpenKeys = findPathByKey(temp, id as string)?.map(
        ele => ele.node_token
      );
      setOpenKeys(defaultOpenKeys!);
    }
  }, [id]);

  const [showMenu, setShowMenu] = useState(true);

  return (
    <>
      {isKeyInMenu ? (
        <aside className="z-30 relative shrink-0 block sm:max-w-[300px]">
          <div className="sticky top-0 h-full max-h-full">
            <ConfigProvider
              theme={{
                token: {
                  colorLink: "#000",
                  fontFamily: "inherit",
                },
                components: {
                  Menu: {
                    subMenuItemBg: "#fff",
                    itemSelectedBg: "#fff",
                  },
                },
              }}
            >
              <div className=" h-full  min-w-8 sm:!pt-[60px]">
                <div className="overflow-y-auto overflow-x-hidden h-[calc(100%-40px)] thin-scrollbar">
                  <Menu
                    className={clsx(!showMenu && "hidden", "h-full side-bar")}
                    openKeys={openKeys}
                    defaultOpenKeys={openKeys}
                    inlineCollapsed={false}
                    style={{ width: 300 }}
                    selectedKeys={[id as string]}
                    mode="inline"
                    items={menuItems}
                    expandIcon={null}
                  />
                </div>

                <button
                  onClick={() => setShowMenu(!showMenu)}
                  id="sidebar-toggle"
                  className={clsx(
                    !showMenu && "h-full",
                    "absolute z-10 p-4 w-full bottom-0 h-10 flex justify-center items-center border-t-[1px] border-r-[1px]"
                  )}
                >
                  <span className="text-xl">{showMenu ? ">>" : "<<"}</span>
                </button>
              </div>
            </ConfigProvider>
          </div>
        </aside>
      ) : (
        <></>
      )}
    </>
  );
}
