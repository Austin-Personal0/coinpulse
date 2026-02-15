import DataTable from "@/components/DataTable";
import TrendingCoins from "@/components/TrendingCoins";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="main-container">
      <section className="home-grid">
        <div id="coin-overview">
          <div className="header p-2">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="Bitcoin"
              width={40}
              height={20}
              className="rounded-full"
            />
            <div className="info">
              <p>Bitcoin / BTC</p>
              <p>$4589386</p>
            </div>
          </div>
        </div>

        <p>Trending Coins</p>
        <TrendingCoins/>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}