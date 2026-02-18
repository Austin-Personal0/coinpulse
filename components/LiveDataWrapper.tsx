import CandlestickChart from "./candlestickChart";
import CoinHeader from "./CoinHeader";
import { Separator } from "./ui/separator";
import React from "react";

const LiveDataWrapper = ({
  children,
  coinId,
  coin,
}: Partial<LiveDataProps>) => {
  return (
    <main id="live-data-wrapper">
      <CoinHeader
        livePrice={coin?.market_data.current_price.usd}
        name={coin?.name}
        image={coin?.image.large}
        priceChange24h={
          coin?.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin?.market_data.price_change_percentage_30d_in_currency.usd
        }
        livePriceChangePercentage24h={coin?.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />
      <div className="trend">
        <CandlestickChart coinId={coinId} />
      </div>
    </main>
  );
};

export default LiveDataWrapper;
