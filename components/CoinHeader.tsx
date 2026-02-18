import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import { Badge } from './ui/badge'
import Image from 'next/image'
import React from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'

const CoinHeader = ({ name , priceChangePercentage30d , priceChange24h , image , livePrice , livePriceChangePercentage24h} : Partial<LiveCoinHeaderProps>) => {

    const isTrendingUp = priceChange24h && priceChange24h > 0
    const is30dUp = priceChangePercentage30d && priceChangePercentage30d > 0
    const stats = [
      {
        label: 'Today',
        value: livePriceChangePercentage24h,
        formatter: formatCurrency,
        isUp: isTrendingUp,
        showIcon: false
    },
        {
            label: '30d Change',
            value: priceChangePercentage30d,
            formatter: formatPercentage,
            isUp: is30dUp,
            showIcon: true
        },
        {
            label: 'Current Price',
            value: livePrice,
            formatter: formatCurrency,
            isUp: isTrendingUp,
            showIcon: false
        }
    ]


  return (
    <div id='coin-header'>
        <h3>{name}</h3>

        <div className="info">
            <Image src={image as string} alt={name as string} width={77} height={77}/>

            <div className="price-row">
                <h1>{formatCurrency(livePrice)}</h1>

                <Badge className={cn('badge', isTrendingUp ? 'badge-up' : 'badge-down')}>
                  {formatPercentage(priceChange24h)}
                  { isTrendingUp ? <TrendingUp/> : <TrendingDown/>}
                  (24h)
                </Badge>
            </div>
        </div>

        <ul className='stats'>
            {stats.map((stat, index) => (
                <li key={index}>
                    <p className='label'>{stat.label}</p>

                    <div className={cn('value', { 'text-green-500' : stat.isUp , 'text-red-500' : !stat.isUp})}>
                      <p>{stat.formatter(stat.value)}</p>
                      {
                        stat.showIcon && stat.isUp ? <TrendingUp height={16} width={16}/> : <TrendingDown height={16} width={16}/>
                      }
                    </div>
                    
                </li>
            ))}
        </ul>
    </div>
  )
}

export default CoinHeader