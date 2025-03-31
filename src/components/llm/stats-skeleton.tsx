"use client";

import {
  BarChart3,
  CircleDollarSign,
  CoinsIcon,
  Hash,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CryptoStats() {
  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/50">
      <CardHeader className="pb-4">
        <div>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-6 w-16" />
          </CardTitle>
          <div className="mt-1">
            <Skeleton className="h-8 w-36" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Rank */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Hash className="w-4 h-4" />
              <span>Rank</span>
            </div>
            <div className="text-xl font-semibold">
              <Skeleton className="h-7 w-12" />
            </div>
          </div>

          {/* Volume */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                <span>Volume (24h)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">
                <Skeleton className="h-7 w-24" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>

          {/* Market Cap */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <CircleDollarSign className="w-4 h-4" />
              <span>Market Cap</span>
            </div>
            <div className="text-xl font-semibold">
              <Skeleton className="h-7 w-28" />
            </div>
          </div>

          {/* Total Supply */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <CoinsIcon className="w-4 h-4" />
              <span>Total Supply</span>
            </div>
            <div className="text-xl font-semibold">
              <Skeleton className="h-7 w-32" />
            </div>
          </div>

          {/* Dominance */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Dominance</span>
            </div>
            <div className="text-xl font-semibold">
              <Skeleton className="h-7 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
