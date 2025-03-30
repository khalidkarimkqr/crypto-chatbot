// import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";

interface CryptoPriceCardProps {
  symbol?: string;
  price?: number;
  closeDate?: Date;
  delta?: number;
}

export default function CryptoPriceCard({
  symbol = "BTC",
  price = 63842.51,
  closeDate = new Date(),
  delta = 5330.0,
}: CryptoPriceCardProps) {
  const isPositive = delta >= 0;
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
            <div className="text-3xl font-bold">{formatPrice(price)}</div>
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
            {`${delta > 0 ? "+" : ""}${((delta / price) * 100).toFixed(2)}%`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
