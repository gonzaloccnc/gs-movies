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
    <section className='py-8 pl-56'>
      <div
        className='h-52 flex flex-col justify-between relative before:absolute
                   before:content-[""] before:-left-10 before:w-[1px] before:bg-white'
        ref={newsLetterRef}
      >
        <div>
          <h1 className='font-poppins font-extralight'>GSL Newsletter</h1>
          <span className='text-7xl'>See first</span>
        </div>
        <div className='flex gap-5'>
          <input
            type='email'
            placeholder='Type your email here*'
            className='outline-none border-[1px] border-white bg-transparent px-4 py-2 w-1/2'
          />
          <button type='button' className='text-red-600 border-[3px] border-red-600 px-6 uppercase'>
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
