import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CryptoPriceCardProps {
  symbol: string;
  price: number;
  closeDate: Date;
  percentageChange: number;
  currency?: string;
}

export default function CryptoPriceCard({
  symbol = "BTC",
  price = 63842.51,
  closeDate = new Date(),
  percentageChange = 2.34,
  currency = "$",
}: CryptoPriceCardProps) {
  const isPositive = percentageChange >= 0;
  const formattedDate = closeDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = closeDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="text-xl font-bold">{symbol}</div>
            <div className="text-3xl font-bold">
              {currency}
              {price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-sm text-muted-foreground">
              {formattedDate} at {formattedTime}
            </div>
          </div>
          <div
            className={cn(
              "flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium",
              isPositive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {isPositive ? (
              <ArrowUpIcon className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 mr-1" />
            )}
            {isPositive ? "+" : ""}
            {percentageChange.toFixed(2)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
