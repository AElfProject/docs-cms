"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Desktop } from "../components/provider";

export default function Loading() {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8">
      <div className="grid  gap-8 py-8 min-h-[calc(100vh-225px)] grid-cols-[300px_1fr]">
        <Desktop>
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
        </Desktop>
        <div className="space-y-8 mt-[60px]">
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
