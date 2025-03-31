"use client";

import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CircleDollarSign,
  CoinsIcon,
  Hash,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CryptoStatsProps {
  name?: string;
  volume?: number;
  volumeChangePercentage?: number;
  rank?: number;
  marketCap?: number;
  totalSupply?: number;
  dominance?: number;
}

export default function CryptoStats({
  name = "Bitcoin",
  volume = 28654321098,
  volumeChangePercentage = 5.23,
  rank = 1,
  marketCap = 1345678901234,
  totalSupply = 21000000,
  dominance = 52.4,
}: CryptoStatsProps) {
  // Format large numbers with commas and abbreviations
  const formatNumber = (num: number) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  const formatSupply = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/50">
      <CardHeader className="pb-4">
        <div>
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
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
            <div className="text-xl font-semibold">#{rank}</div>
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
                {formatNumber(volume)}
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  volumeChangePercentage >= 0
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}
              >
                {volumeChangePercentage >= 0 ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                <span>{Math.abs(volumeChangePercentage).toFixed(2)}%</span>
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
              {formatNumber(marketCap)}
            </div>
          </div>

          {/* Total Supply */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <CoinsIcon className="w-4 h-4" />
              <span>Total Supply</span>
            </div>
            <div className="text-xl font-semibold">
              {formatSupply(totalSupply)}
            </div>
          </div>

          {/* Dominance */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Dominance</span>
            </div>
            <div className="text-xl font-semibold">{dominance.toFixed(2)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
