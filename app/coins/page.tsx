import { CoinsPagination } from "@/components/CoinsPagination"
import DataTable from "@/components/DataTable"
import { fetcher } from "@/lib/coingecko.actions"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const Page = async ({ searchParams } : NextPageProps ) => {

    const { page } = await searchParams

    const currentPage = Number(page) || 1
    const perPage = 10

    const allCoins = await fetcher<CoinMarketData[]>('GET' , '/coins/markets' , { 
        vs_currency : 'usd',
        order : 'market_cap_desc',
        per_page : perPage,
        page : currentPage,
        sparkline : false,
        price_change_percentage : '24h'
    })

    const columns : DataTableColumn<CoinMarketData>[] = [
        {
            header : 'Rank',
            cellClassName : 'rank-cell',
            cell : ( coin ) => (
            <>
                #{coin.market_cap_rank}
                <Link href={ `/coins/${coin.id}` } aria-label='View Coin'></Link>
            </>)
        },
        {
            header : 'Token',
            cellClassName : 'token-cell',
            cell : ( coin ) => {
                return <div className="token-info">
                    <Image src={coin.image} alt={coin.name} width={24} height={24} className="rounded-full"/>
                    <p>{coin.name} ({coin.symbol.toUpperCase()})</p>
                </div>
            }
        },
        {
            header : 'Price',
            cellClassName : '',
            cell : ( coin ) => formatCurrency(coin.current_price)
        },
        {
            header : '24H Change',
            cellClassName : '',
            cell : ( coin ) => {
                const isTrendingUp = coin.price_change_percentage_24h >= 0

                return <div className={cn(
                    'price-change',
                    isTrendingUp ? 'text-green-500' : 'text-red-500'
                )}>
                    <p>{formatPercentage(coin.price_change_percentage_24h)}</p>
                </div>
            }
        },
        {
            header : 'Market Cap',
            cellClassName : '',
            cell : ( coin ) => formatCurrency(coin.market_cap)
        }
    ]

    const hasMorePages = allCoins.length === perPage // 10 === 10 !hasMorePages = false
    const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100 // Round up to the nearest 100

  return (
    <main id='coins-page'>
        <div className='content'>
            <h4>All Coins</h4>
            <DataTable columns={columns} data={allCoins} rowKey={(_ , index) => index} tableClassName='coins-table'/>
            <CoinsPagination currentPage={currentPage} totalPages={estimatedTotalPages} hasMorePages={hasMorePages}/>
        </div>
    </main>
  )
}

export default Page
