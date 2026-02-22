'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import GlobalCommand from './GlobalCommand';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Kbd } from './ui/kbd';

const Header = () => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === 'k') {
        console.log('shift key pressed')
        event.preventDefault()
        setOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

    const pathname = usePathname()

    const [open, setOpen] = useState(false)
  return (
    <header>
        <div className='main-container inner'>
            <Link href='/'>
                    <span className='flex flex-row items-center space-x-2'>
                    <Image src="/bitcoin.png" alt='' width={60} height={20} className='rounded-full'/>
    	            <p className='font-bold text-2xl text-shadow-white'>CoinPulse</p>
                    </span>
            </Link>

            <nav>
                <Link href='/' className={cn('nav-link' , { 'is-active' : pathname === '/' , 'is-home' : true })}>Home</Link>
                <span className='flex items-center space-x-2'>
                  <Search size={18}/>
                  <p onClick={() => setOpen(true)} className='hover:text-zinc-600/80 cursor-pointer transition-colors duration-200'>Search</p>
                  {/* <Kbd>Ctrl + K</Kbd> */}
                </span>
                <GlobalCommand open={open} onOpenChange={setOpen}/>
                <Link href='/coins' className={cn('nav-link' , { 'is-active' : pathname === '/coins'})}>All Coins</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header