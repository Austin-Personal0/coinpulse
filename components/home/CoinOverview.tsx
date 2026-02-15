import { fetcher } from '@/lib/coingecko.actions'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

const CoinOverview = async () => {

    const coin = await fetcher<CoinDetailsData>('/coins/bitcoin' , {
        dex_pair_format : 'symbol'
      })

      
  return (
    <div id="coin-overview">
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
        </div>
  )
}

export default CoinOverview