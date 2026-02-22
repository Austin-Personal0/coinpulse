"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import SkeletonLoader from "./skeleton-loader";

type CommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GlobalCommand = ({ open, onOpenChange }: CommandProps) => {
  const [search, setSearch] = useState<string>("bitcoin");

  const [coinData, setCoinData] = useState<SearchCoin[]>([]);

  const debouncedSearch = useDebounce(search, 800);

  const handleSearch = async () => {
    await fetcher<SearchResponse>("GET", "/search", {query: debouncedSearch,}).then((res) => {
      setCoinData(res.coins);
    })}

    useEffect(() => {
      if(debouncedSearch){
        handleSearch()
      }
    } , [ debouncedSearch ])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
        />

        <Suspense fallback={<SkeletonLoader type="card"/>}>
          <CommandList className="hide-scrollbar">
            <CommandEmpty>No results found.</CommandEmpty>
            {coinData.map((coin, index) => (
              <CommandItem key={index}>
                <Link href={`/coins/${coin.id}`} className="flex justify-between items-center w-full">
                  <div className="flex space-x-3 items-center">
                    <Image
                      src={coin.thumb}
                      alt={coin.name}
                      height={35}
                      width={35}
                      className="rounded-full"
                    />
                    <span className="space-y-1"> 
                      <p className="text-md font-semibold">{coin.name}</p>
                      <p className="font-light">{coin.symbol}</p>
                    </span>
                  </div>
                  <div>
                    <div
                      className={cn(
                        "price-change",
                        coin.data?.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      <p>
                        {formatPercentage(
                          coin.data?.price_change_percentage_24h
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
                <CommandSeparator />
              </CommandItem>
            ))}
          </CommandList>
        </Suspense>
      </Command>
    </CommandDialog>
  );
};
export default GlobalCommand;
