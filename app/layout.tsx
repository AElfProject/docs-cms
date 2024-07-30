import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { cn, getConfigContent, getMenu } from "@/lib/utils";
import { Poppins as FontSans } from "next/font/google";
import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import { getNodeToken, NodesItem } from "../services/larkServices";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  const nodes = await getNodeToken();
  const appToken = nodes.items.find((ele: NodesItem) => {
    return ele.title === "Configurations" && ele.obj_type === "bitable";
  })?.obj_token;
  let configObj: { [key: string]: any } = appToken
    ? await getConfigContent(appToken, "Base")
    : {};
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AntdRegistry>
          <Header menu={menu} baseConfig={configObj} />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer baseConfig={configObj} />
        </AntdRegistry>
      </body>
    </html>
  );
}
