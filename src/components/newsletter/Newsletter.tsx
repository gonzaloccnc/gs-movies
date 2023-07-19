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
    <section className='py-8 desktop:pl-56 mobile:px-4'>
      <div
        className='h-52 flex flex-col desktop:justify-between desktop:gap-y-0 relative
        before:absolute before:content-[""] before:-left-10 before:w-[1px] before:bg-white
        mobile:gap-y-5'
        ref={newsLetterRef}
      >
        <div>
          <span className='desktop:text-base mobile:text-sm font-extralight'>GSL Newsletter</span>
          <h1 className='desktop:text-7xl mobile:text-4xl'>See first</h1>
        </div>
        <div className='flex gap-5 mobile:flex-col desktop:flex-row'>
          <input
            type='email'
            placeholder='Type your email here*'
            className='outline-none border-[1px] border-white bg-transparent px-4 py-2
            desktop:w-1/2 mobile:w-full'
          />
          <button
            type='button'
            className='text-red-600 border-[3px] border-red-600 desktop:px-6 uppercase'
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
