import Converter from "@/components/Converter";
import GainersLosers from "@/components/GainersLosers";
import LiveDataWrapper from "@/components/LiveDataWrapper";
import SkeletonLoader from "@/components/skeleton-loader";
import {fetcher} from "@/lib/coingecko.actions";
import {formatCurrency} from "@/lib/utils";
import {ArrowUpRight} from "lucide-react";
import Link from 'next/link'
import { Suspense } from "react";

const Page = async ( {params} : NextPageProps ) => {
    const { id } = await params

    const coinData = await fetcher<CoinDetailsData>('GET' , `/coins/${id}` , {
        dex_pair_format : 'contract_address'
    });

    const coinDetails = [
        {
            label : 'Market Cap',
            value : formatCurrency(coinData.market_data.market_cap.usd)
        },
        {
            label : 'Market Cap Rank',
            value : `# ${coinData.market_cap_rank}`
        },
        {
            label : 'Total Volume',
            value : formatCurrency(coinData.market_data.total_volume.usd)
        },
        {
            label : 'Website',
            value : '-',
            link : coinData.links.homepage[0],
            linkText : 'Homepage'
        },
        {
            label : 'Explorer',
            value : '-',
            link : coinData.links.blockchain_site[0],
            linkText : 'Explorer'
        },
        {
            label : 'Community',
            value : '-',
            link : coinData.links.subreddit_url,
            linkText : 'Community'
        }
    ]

    return <main id='coin-details-page'>
        <section className='primary'>
            <Suspense fallback={<SkeletonLoader type="card"/>}>
                <LiveDataWrapper coin={coinData} coinId={id}>
                    <h4>Exchange Listings</h4>
                </LiveDataWrapper>
            </Suspense>
        </section>
        <section className='secondary'>

            <Converter symbol={coinData.symbol} icon={coinData.image.small} priceList={coinData.market_data.current_price}/>
            <div className='details'>
                <h4>Coin Details</h4>

                <Suspense fallback={<SkeletonLoader type="card"/>}>
                    <ul className='details-grid'>
                        {
                            coinDetails.map( ({ label, value , linkText , link  } , index ) => (
                                <li key={index}>
                                    <p className={label}>{label}</p>
                                    {link ? (<div className='link'>
                                        <Link href={link} target='_blank'>{linkText || label}</Link>
                                        <ArrowUpRight size={16} />

                                        </div>) : (<p className='text-base font-medium'>{value}</p>)
                                    }
                                </li>
                            ) )
                        }
                    </ul>
                </Suspense>
            </div>
            <Suspense fallback={<SkeletonLoader type="card"/>}>
                <GainersLosers/>        
            </Suspense>
        </section>
    </main>
}

export default Page;
