import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCurrency, formatPercentage, trendingClasses } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const GainersLosers = async () => {
  const coins = await fetcher<CoinMarketData[]>("GET", "/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 250,
    page: 1,
    price_change_percentage: "24h",
  });

  const gainers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const losers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  return (
    <div id="top-gainers-losers">
      <Tabs defaultValue="gainers">
        <TabsList variant="line" className="tabs-list">
          <TabsTrigger value="gainers" className="tabs-trigger">
            Top Gainers
          </TabsTrigger>
          <TabsTrigger value="losers" className="tabs-trigger">
            Top Losers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gainers" className="tabs-content">
          {gainers.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </TabsContent>

        <TabsContent value="losers" className="tabs-content">
          {losers.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

function CoinCard({ coin }: { coin: CoinMarketData }) {
  const { textClass, bgClass } = trendingClasses(coin.price_change_percentage_24h);
  const isUp = coin.price_change_percentage_24h >= 0;

  return (
    <Link
      href={`/coins/${coin.id}`}
      className="flex items-center justify-between gap-3 rounded-xl bg-dark-500 px-4 py-3 transition-colors hover:bg-dark-500/80"
    >
      <div className="flex items-center gap-3">
        <Image
          src={coin.image}
          alt={coin.name}
          width={36}
          height={36}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{coin.name}</span>
          <span className="text-xs text-muted-foreground uppercase">
            {coin.symbol}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className="text-sm font-semibold">
          {formatCurrency(coin.current_price)}
        </span>
        <span className={cn("flex items-center gap-1 text-xs font-medium", textClass)}>
          {isUp ? (
            <TrendingUp width={14} height={14} />
          ) : (
            <TrendingDown width={14} height={14} />
          )}
          {formatPercentage(coin.price_change_percentage_24h)}
        </span>
      </div>
    </Link>
  );
}

export default GainersLosers;
