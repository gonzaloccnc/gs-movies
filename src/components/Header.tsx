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
      <header className='h-16 items-center justify-between bg-black px-12 text-white mobile:hidden desktop:flex'>
        <h1 className='text-5xl'>
          <Link href='/'>
            GS
          </Link>
        </h1>
        <nav className='flex gap-10 font-poppins font-extralight'>
          <Link href='/' className='hover:text-orange-600'>Home</Link>
          <Link href='/buy/streaming' className='hover:text-orange-600'>Streaming/Buy</Link>
          <Link href='/#next_releases' className='hover:text-orange-600' scroll={false}>Next releases</Link>
          <Link href='/catalog' className='hover:text-orange-600'>Catalog</Link>
          <Link href='/about' className='hover:text-orange-600'>About</Link>
          <Link href='/contact' className='hover:text-orange-600'>Contact</Link>
        </nav>
      </header>

      <header className='flex items-center justify-between px-4 desktop:hidden'>
        <h1 className='text-5xl'>
          <Link href='/'>
            GS
          </Link>
        </h1>

        <GiHamburgerMenu
          onClick={handleOpenBurger}
          className='text-2xl text-white'
        />

        <div
          className='fixed bottom-1/2 right-0 top-0 z-50 hidden translate-x-[100%] border-b border-l
          bg-gs_burger px-8 py-4 transition-all ease-slide'
          ref={burgerRef}
        >
          <AiFillCloseCircle
            onClick={handleCloseBurguer}
            className='absolute right-5 top-5 text-2xl'
          />
          <nav
            className='flex h-full flex-col items-center justify-center gap-2 text-center
            font-poppins font-extralight'
          >
            <Link
              href='/'
              className='hover:text-orange-600'
              onClick={handleCloseBurguer}
            >
              Home</Link>
            <Link
              href='/buy/streaming'
              className='hover:text-orange-600'
              onClick={handleCloseBurguer}
            >
              Streaming/Buy
            </Link>
            <Link
              href='/#next_releases'
              className='hover:text-orange-600'
              onClick={handleCloseBurguer}
              scroll={false}
            >
              Next releases
            </Link>
            <Link
              href='/catalog'
              className='hover:text-orange-600'
              onClick={handleCloseBurguer}
            >
              Catalog
            </Link>
            <Link
              href='/about'
              className='hover:text-orange-600'
              onClick={handleCloseBurguer}
            >
              About
            </Link>
            <Link
              href='/contact'
              className='hover:text-orange-600'
              onClick={handleCloseBurguer}
            >
              Contact
            </Link>
          </nav>
        </div>

      </header>
    </>
  )
}

export {
  Header
}
