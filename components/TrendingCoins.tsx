import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import DataTable from "./DataTable";

const TrendingCoins = () => {

    const columns: DataTableColumn<TrendingCoin>[] = [
        {
          header: "Name",
          cell: (coin) => {
            const { item } = coin;
    
            return (
              <Link href={`/coins/${item.id}`}>
                <div className="flex items-center space-x-2">
                  <Image src={item.large} alt={item.name} width={36} height={36} />
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
                  {item.data.price_change_percentage_24h.usd}
                </span>
              </div>
            );
          },
        },
        {
          header: "Price",
          cell: (coin) => {
            const { item } = coin;
    
            return <p>${item.data.price}</p>;
          },
        },
      ];
    
      // Dummy data for trending coins
      const trendingCoins: TrendingCoin[] = [
        {
          item: {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "BTC",
            market_cap_rank: 1,
            thumb: "/images/bitcoin.png", // Local image asset
            large: "/images/bitcoin.png", // Local image asset
            data : {
              price: 1,
            price_change_percentage_24h:{
              usd: 2.5	
            },
            }
          },
        },
        {
          item: {
            id: "ethereum",
            name: "Ethereum",
            symbol: "ETH",
            market_cap_rank: 2,
            thumb: "/images/ethereum.png", // Local image asset
            large: "/images/ethereum.png", // Local image asset
            data : {
              price: 0.07,
            price_change_percentage_24h: {
              usd: -1.2
            },
            }
          },
        },
        {
          item: {
            id: "dogecoin",
            name: "Dogecoin",
            symbol: "DOGE",
            market_cap_rank: 10,
            thumb: "/images/dogecoin.png", // Local image asset
            large: "/images/dogecoin.png", // Local image asset
            data : {
              price: 0.000005,
            price_change_percentage_24h: {
              usd: 5.0
            },
            }
          },
        },
      ];
  return (
    <div>
        {/* <DataTable columns={columns} data={trendingCoins}/> */}
    </div>
  )
}

export default TrendingCoins