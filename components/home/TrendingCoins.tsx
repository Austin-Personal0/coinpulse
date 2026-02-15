import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "../DataTable";
import Link from "next/link";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
    undefined,
    300
  );

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cell: (coin) => {
        const { item } = coin;

        return (
          <Link href={`/coins/${item.id}`}>
            <div className="flex flex-col items-start space-y-1">
              <Image src={item.large} alt={item.name} width={36} height={36} className="rounded-full"/>
              <p>{item.name}</p>
            </div>
          </Link>
        );
      },
    },
    {
      header: "24H Change",
      cell: (coin) => {
        const { item } = coin;

        const isTrendingUp = item.data.price_change_percentage_24h.usd >= 0;

        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
            <span className="ml-1">
              {item.data.price_change_percentage_24h.usd.toFixed(2)}%
            </span>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];
  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div id="trending-coins">
        <DataTable
          data={trendingCoins.coins.slice(0, 6) || []}
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
