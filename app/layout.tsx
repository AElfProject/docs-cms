import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { cn, getConfigContent, getMenu } from "@/lib/utils";
import { Poppins as FontSans } from "next/font/google";
import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import { getNodeToken, NodesItem } from "../services/larkServices";
import { ThemeProvider } from "next-themes";
import { listFooterLinks } from "../services/list-footer-links";

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
  const footerData = await listFooterLinks();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AntdRegistry>
            <Header menu={menu} baseConfig={configObj} />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer baseConfig={configObj} footerData={footerData} />
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
