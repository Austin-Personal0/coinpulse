import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

type SkeletonLoaderProps = {
  type: "avatar" | "card" | "text" | "form" | "table" | "gainers-losers";
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
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex gap-4" key={index}>
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      ) : type === "gainers-losers" ? (
        <div className="flex w-full flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center gap-3" key={index}>
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default SkeletonLoader;
