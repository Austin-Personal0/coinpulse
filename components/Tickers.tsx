import { fetcher } from '@/lib/coingecko.actions'
import React from 'react'
import DataTable from './DataTable'
import { formatCurrency, formatPercentage, timeAgo } from '@/lib/utils'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const Tickers = async ({ coinId } : { coinId : string | undefined }) => {

    const tickersData = await fetcher<Tick>('GET' , `/coins/${coinId}/tickers`)
    
    const tickers = tickersData?.tickers.slice(0,20) ?? []

    const columns : DataTableColumn<Ticker>[] = [
        {
            header: 'Exchange',
            cellClassName : '',
            cell: (row: Ticker) => (
                <div className='flex items-center gap-2'>
                    {row.market.logo && (
                        <Image 
                            src={row.market.logo} 
                            alt={row.market.name} 
                            width={24} 
                            height={24}
                        />
                    )}
                    <span>{row.market.name}</span>
                </div>
            )
        },
        {
            header: 'Pair',
            cellClassName : '',
            cell: (row: Ticker) => (
                <span>{row.base}/{row.target}</span>
            )
        },
        {
            header: 'Price',
            cellClassName : '',
            cell: (row: Ticker) => (
                <span>{formatCurrency(row.converted_last.usd)}</span>
            )
        },
        {
            header: 'Volume (24h)',
            cellClassName : '',
            cell: (row: Ticker) => (
                <span>{formatCurrency(row.converted_volume.usd)}</span>
            )
        },
        {
            header: 'Spread',
            cellClassName : '',
            cell: (row: Ticker) => (
                <span>{formatPercentage(row.bid_ask_spread_percentage)}</span>
            )
        },
        {
            header: 'Updated',
            cellClassName : '',
            cell: (row: Ticker) => (
                <span>{timeAgo(row.last_fetch_at)}</span>
            )
        },
        {
            header: '',
            cellClassName : '',
            cell: (row: Ticker) => (
                <a 
                    href={row.trade_url} 
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    <ExternalLink width={14} height={14} />
                </a>
            )
        }
    ]

    if (tickers.length === 0) {
        return (
            <div className='text-gray-400 p-4'>No tickers available</div>
        )
    }

  return (
    <main id='coins-page'>
      <div className='content hide-scrollbar'>
        <h4>Exchange Listings</h4>
          <DataTable 
              columns={columns} 
              data={tickers} 
              rowKey={(row, index) => `${row.market.identifier}-${row.target}-${index}`}
              tableClassName='coins-table hide-scrollbar'
          />
      </div>
    </main>
  )
}

export default Tickers