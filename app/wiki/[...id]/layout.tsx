import { getMenu, getMenuShow } from "@/lib/utils";
import Sidebar from "@/components/sidebar/index";
import Breadcrumb from "@/components/Breadcrumb";
import { Suspense } from "react";
import Loading from "./loading";

export default async function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  const menuShow = await getMenuShow();
  return (
    <main>
      <div className="flex">
        <div className="flex w-full">
          <div className="hidden sm:flex">
            <Sidebar menu={menuShow} />
          </div>
          <div className="container pt-[60px] min-h-[calc(100vh-225px)] break-words">
            <Breadcrumb menu={menuShow}></Breadcrumb>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
