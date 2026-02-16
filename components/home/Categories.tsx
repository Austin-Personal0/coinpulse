import { fetcher } from "@/lib/coingecko.actions"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import DataTable from "../DataTable"
import Image from "next/image"

const Categories = async () => {

    const topCategories = await fetcher<Category[]>('GET' , '/coins/categories')

    const columns : DataTableColumn<Category>[] = [
        {
            header : 'Category',
            cellClassName : 'category-cell',
            cell : ( category ) => category.name
        },
        {
            header : 'Top Gainers',
            cellClassName : 'top-gainers-cell',
            cell : ( category ) => {
                const coinImages = category.top_3_coins

                return <div className="flex flex-row items-center space-x-1">
                    {
                        coinImages.map(( coin ) => <Image key={coin} src={coin} alt={coin} width={28} height={28} className="rounded-full"/>)
                    }
                </div>
                
            }
        },
        {
            header : '24H Change',
            cellClassName : 'change-header-cell',
            cell : ( category ) => {
                const isTrendingUp = category.market_cap_change_24h >= 0

                return (
                    <div className={cn(
                        'price-change',
                        isTrendingUp ? 'text-green-500' : 'text-red-500'
                    )}>
                        <p className="flex flex-row items-center space-x-0.75">
                            {isTrendingUp ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}
                            <span className="ml-1">{formatPercentage(category.market_cap_change_24h)}</span>
                        </p>
                    </div>
                )
            }
        },
        {
            header : 'Market Cap',
            cellClassName : 'market-cap-cell',
            cell : ( category ) => formatCurrency(category.market_cap)
        },
        {
            header : '24H Volume',
            cellClassName : 'volume-cell',
            cell : ( category ) => formatCurrency(category.volume_24h)
        }
    ]
  return (
    <div id='categories' className="custom-scrollbar">
        <h4>Top Categories</h4>

        <DataTable columns={columns} data={topCategories.slice(0,10)} rowKey={(_,index) => index} tableClassName="mt-3"/>
    </div>
  )
}

export default Categories