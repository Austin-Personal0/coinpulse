import { fetcher } from '@/lib/coingecko.actions'
import { formatCurrency } from '@/lib/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import SkeletonLoader from '../skeleton-loader';
import CandlestickChart from '../candlestickChart';

const CoinOverview = async () => {

    let coin : CoinDetailsData = {} as CoinDetailsData
    let coinOHLCData : OHLCData[] = []

    try {

        const [ coin ] = await Promise.all([
            await fetcher<CoinDetailsData>('GET','/coins/bitcoin' , {
                dex_pair_format : 'symbol'
              })
        ])

        return (
            <div id="coin-overview">

                <CandlestickChart data = {coinOHLCData} coinId='bitcoin'>

                <div className="header p-2">
                    <Image
                      src={coin.image.large}
                      alt={coin.name}
                      width={40}
                      height={20}
                      objectFit="contain"
                    />
                    <div className="info">
                      <p>{coin.name} / { coin.symbol }</p>
                      <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                    </div>
                  </div>
                </CandlestickChart>
                  
                </div>
          )

    } catch (error) {
        console.error('Error fetching coin data:', error);
        return <SkeletonLoader type='card'/>
    }
}

export default CoinOverview