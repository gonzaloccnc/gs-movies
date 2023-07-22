import { useEffect, useRef } from 'react'

const Newsletter: React.FC = () => {
  const newsLetterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (newsLetterRef !== null) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          newsLetterRef.current?.classList.add('before:animate-line')
        }
      })

      observer.observe(newsLetterRef.current as HTMLElement)
    }
  }, [])

  return (
    <section className='py-8 mobile:px-4 desktop:pl-56'>
      <div
        className='relative flex h-52 flex-col before:absolute before:-left-10
        before:w-[1px] before:bg-white before:content-[""] mobile:gap-y-5
        desktop:justify-between desktop:gap-y-0'
        ref={newsLetterRef}
      >
        <div>
          <span className='font-extralight mobile:text-sm tablet:text-base'>GSL Newsletter</span>
          <h1 className='mobile:text-4xl tablet:text-7xl'>See first</h1>
        </div>
        <div className='flex gap-5 mobile:flex-col tablet:flex-row'>
          <input
            type='email'
            placeholder='Type your email here*'
            className='border-[1px] border-white bg-transparent px-4 py-2 outline-none
            mobile:w-full tablet:w-1/2'
          />
          <button
            type='button'
            className='border-[3px] border-red-600 uppercase text-red-600 tablet:px-6'
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}

export {
  Newsletter
}
