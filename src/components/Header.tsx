import { poppins } from '@/utils/Font'
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className='flex justify-between items-center px-12 bg-black text-white h-16'>
      <h1 className='text-5xl'>
        <Link href='/'>
          GS
        </Link>
      </h1>
      <nav className={`${poppins.className} flex gap-10 font-extralight`}>
        <Link href='/' className='hover:text-orange-600'>Home</Link>
        <a href='/buy/streaming' className='hover:text-orange-600'>Streaming/Buy</a>
        <a href='/coming_soon' className='hover:text-orange-600'>Coming Soon</a>
        <a href='/catalog' className='hover:text-orange-600'>Catalog</a>
        <a href='/about' className='hover:text-orange-600'>About</a>
        <a href='/contact' className='hover:text-orange-600'>Contact</a>
      </nav>
    </header>
  )
}

export {
  Header
}
