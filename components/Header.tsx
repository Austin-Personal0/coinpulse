'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {

    const pathname = usePathname()
  return (
    <header>
        <div className='main-container inner'>
            <Link href='/'>
                    <span className='flex flex-row items-center space-x-2'>
                    <Image src="/noBgHeader.png" alt='' width={40} height={20} className='rounded-full'/>
    	            <p className='font-bold text-2xl text-shadow-white'>CoinPulse</p>
                    </span>
            </Link>

            <nav>
                <Link href='/' className={cn('nav-link' , { 'is-active' : pathname === '/' , 'is-home' : true })}>Home</Link>
                <p>Search Modal</p>
                <Link href='/coins' className={cn('nav-link' , { 'is-active' : pathname === '/coins'})}>All Coins</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header