import DataTable from "@/components/DataTable";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import SkeletonLoader from "@/components/skeleton-loader";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {

  
  return (
    <main className="main-container">
      <section className="home-grid">

        <Suspense fallback = {<SkeletonLoader type="card"/>}>
          <CoinOverview/>
        </Suspense>

        <Suspense fallback = {<SkeletonLoader type="table"/>}>
          <TrendingCoins/>
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}