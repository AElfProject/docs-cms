import { getMenu } from "@/lib/utils";
import Sidebar from "@/components/sidebar/index";
import Breadcrumb from "@/components/Breadcrumb";

export default async function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  return (
    <main>
      <div className="border-b flex">
        <div className="flex w-full">
          <Sidebar menu={menu} />
          <div className="container pt-[60px]">
            <Breadcrumb menu={menu}></Breadcrumb>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
