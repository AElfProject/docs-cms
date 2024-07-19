import { Skeleton } from "@/components/ui/skeleton";
import { headers } from "next/headers";
import { isMobile } from "../lib/isMobile";

export default function Loading() {
  const userAgent = headers().get("user-agent") || "";
  const isMobileDevice = isMobile(userAgent);
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8">
      <div className="grid  gap-8 py-8 min-h-[calc(100vh-225px)] grid-cols-[300px_1fr]">
        {!isMobileDevice && (
          <div className="">
            <nav className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </nav>
          </div>
        )}
        <div className="space-y-8 mt-[60px]">
          <div>
            <Skeleton className="h-8 w-64" />
            <div className="mt-4 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-64" />
            <div className="mt-4 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-64" />
            <div className="mt-4 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
