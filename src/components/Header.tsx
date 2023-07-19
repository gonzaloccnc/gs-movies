import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRef } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const Header: React.FC = () => {
  const burgerRef = useRef<HTMLDivElement | null>(null)

  const handleOpenBurger = (): void => {
    if (burgerRef.current === null) return

    burgerRef.current?.classList.remove('hidden')
    burgerRef.current?.classList.add('flex')

    setTimeout(() => {
      burgerRef.current?.classList.remove('translate-x-[100%]')
    }, 500)
  }

  const handleCloseBurguer = (): void => {
    if (burgerRef.current === null) return

    burgerRef.current?.classList.add('translate-x-[100%]')

    setTimeout(() => {
      burgerRef.current?.classList.remove('flex')
      burgerRef.current?.classList.add('hidden')
    }, 500)
  }

  return (
    <>
      <header className='desktop:flex mobile:hidden justify-between items-center px-12 bg-black text-white h-16'>
        <h1 className='text-5xl'>
          <Link href='/'>
            GS
          </Link>
        </h1>
        <nav className='font-poppins flex gap-10 font-extralight'>
          <Link href='/' className='hover:text-orange-600'>Home</Link>
          <Link href='/buy/streaming' className='hover:text-orange-600'>Streaming/Buy</Link>
          <Link href='/#next_releases' className='hover:text-orange-600' scroll={false}>Next releases</Link>
          <Link href='/catalog' className='hover:text-orange-600'>Catalog</Link>
          <Link href='/about' className='hover:text-orange-600'>About</Link>
          <Link href='/contact' className='hover:text-orange-600'>Contact</Link>
        </nav>
      </header>

      <header className='desktop:hidden flex justify-between items-center px-4'>
        <h1 className='text-5xl'>
          <Link href='/'>
            GS
          </Link>
        </h1>

        <GiHamburgerMenu
          onClick={handleOpenBurger}
          className='text-white text-2xl'
        />

        <div
          className='hidden fixed top-0 right-0 bottom-1/2 bg-gs_burger border-l z-50 px-8
          py-4 translate-x-[100%] transition-all ease-slide border-b'
          ref={burgerRef}
        >
          <AiFillCloseCircle
            onClick={handleCloseBurguer}
            className='absolute top-5 right-5 text-2xl'
          />
          <nav
            className='font-poppins flex flex-col gap-2 text-center font-extralight h-full
            items-center justify-center'
          >
            <Link href='/' className='hover:text-orange-600'>Home</Link>
            <Link href='/buy/streaming' className='hover:text-orange-600'>Streaming/Buy</Link>
            <Link href='/#next_releases' className='hover:text-orange-600' scroll={false}>Next releases</Link>
            <Link href='/catalog' className='hover:text-orange-600'>Catalog</Link>
            <Link href='/about' className='hover:text-orange-600'>About</Link>
            <Link href='/contact' className='hover:text-orange-600'>Contact</Link>
          </nav>
        </div>

      </header>
    </>
  )
}

export {
  Header
}
