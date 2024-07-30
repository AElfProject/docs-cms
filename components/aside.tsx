"use client";

import { AnyItem } from "@/components/blocks/renderer";
import TableOfContents from "@/components/blocks/table-of-contents";
import { Collapse, ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Desktop, Mobile } from "./provider";
import { getThemeConfig } from "../lib/theme";
interface Props {
  data: AnyItem[];
}

export function Aside({ data }: Props) {
  const contentItems = [
    {
      key: "1",
      label: "On this page",
      children: <TableOfContents allItems={data} />,
    },
  ];
  const ifShowCollapse = data.filter(i =>
    [3, 4, 5, 6, 7, 8, 9, 10, 11].includes(i.block_type)
  ).length;

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
    <aside className="sm:w-1/3 w-full">
      <Mobile>
        {ifShowCollapse ? (
          <ConfigProvider
            theme={{
              algorithm: getThemeConfig(theme, [
                antdTheme.defaultAlgorithm,
                antdTheme.darkAlgorithm,
              ]),
              token: {
                colorLink: "#000",
                fontFamily: "inherit",
              },
              components: {
                Collapse: {
                  contentPadding: "2px",
                },
              },
            }}
          >
            <Collapse
              className="wiki-collapse-container !mb-4"
              items={contentItems}
            ></Collapse>
          </ConfigProvider>
        ) : null}
      </Mobile>
      <Desktop>
        <div className="overflow-y-auto max-h-[calc(100vh-60px)] sticky top-20">
          <TableOfContents allItems={data} />
        </div>
      </Desktop>
    </aside>
  );
}
