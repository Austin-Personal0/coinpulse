import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

type SkeletonLoaderProps = {
  type: "avatar" | "card" | "text" | "form" | "table";
};

const SkeletonLoader = ({ type }: SkeletonLoaderProps) => {
  return (
    <main>
      {type === "avatar" ? (
        <div className="flex w-fit items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
      ) : type === "card" ? (
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      ) : type === "text" ? (
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : type === "table" ? (
        <div className="flex w-full max-w-sm flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex gap-4" key={index}>
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default SkeletonLoader;
