import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export default function PriceSkeleton() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-12" /> {/* Symbol skeleton */}
            <Skeleton className="h-10 w-32" /> {/* Price skeleton */}
            <Skeleton className="h-5 w-40" /> {/* Date skeleton */}
          </div>
          <Skeleton className="h-6 w-16 rounded-md" />{" "}
          {/* Percentage change skeleton */}
        </div>
      </CardContent>
    </Card>
  );
}
