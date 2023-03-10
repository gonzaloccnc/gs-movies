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
        <Link href='/'>Home</Link>
        <a href='/buy/streaming'>Streaming/Buy</a>
        <a href='/coming_soon'>Coming Soon</a>
        <a href='/catalog'>Catalog</a>
        <a href='/about'>About</a>
        <a href='/contact'>Contact</a>
      </nav>
    </header>
  )
}

export {
  Header
}
