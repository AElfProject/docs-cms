import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getMenu } from "@/lib/utils";
import Sidebar from "@/components/sidebar/index";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import { Footer } from "@/components/footer";

export default async function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  return (
    <AntdRegistry>
      <main>
        <div className="border-b flex">
          <Header menu={menu} />
          <div className="flex w-full">
            <Sidebar menu={menu} />
            <div className="container pt-[60px]">
              <Breadcrumb menu={menu}></Breadcrumb>
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </AntdRegistry>
  );
}
