import { getMenu } from "@/lib/utils";
import Sidebar from "@/components/sidebar/index";
import Breadcrumb from "@/components/Breadcrumb";
import { Suspense } from "react";
import Loading from "./loading";
import { headers } from "next/headers";
import { isMobile } from "../../../lib/isMobile";

export default async function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  const userAgent = headers().get("user-agent") || "";
  const isMobileDevice = isMobile(userAgent);
  return (
    <main>
      <div className="border-b flex">
        <div className="flex w-full">
          {!isMobileDevice && <Sidebar menu={menu} />}
          <div className="container pt-[60px] min-h-[calc(100vh-225px)] break-words">
            <Breadcrumb menu={menu}></Breadcrumb>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
