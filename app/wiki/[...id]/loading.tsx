import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container flex-1 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
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
  );
}
