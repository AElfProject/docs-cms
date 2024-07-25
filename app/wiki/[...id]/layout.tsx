import { getMenu } from "@/lib/utils";
import Sidebar from "@/components/sidebar/index";
import Breadcrumb from "@/components/Breadcrumb";
import { Suspense } from "react";
import Loading from "./loading";
import { Desktop } from "../../../components/provider";

export default async function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  return (
    <main>
      <div className="flex">
        <div className="flex w-full">
          <Desktop>
            <Sidebar menu={menu} />
          </Desktop>
          <div className="container pt-[60px] min-h-[calc(100vh-225px)] break-words">
            <Breadcrumb menu={menu}></Breadcrumb>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
