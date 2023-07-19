import { type MovieType } from '@/utils/API'
import Link from 'next/link'
import { type FC } from 'react'
import { Release } from './Release'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useSlider } from '@/hooks/useSlider'

interface ReleasesWrapProps {
  releases: MovieType[]
}

const ReleasesWrap: FC<ReleasesWrapProps> = ({ releases }) => {
  const onlyPreviews = [...releases].slice(0, 8)
  const { handleNextImage, handlePrevImage, slider, click } = useSlider<HTMLDivElement>()

  // const hadnleNextSlider = (): void => {
  //   setClicks(click + 1)
  //   if (slider.current !== null) {
  //     const sl = slider.current
  //     const gap = getComputedStyle(sl).columnGap.replace('px', '')
  //     const marginLeft = sl.firstElementChild?.clientWidth ?? 0
  //     const sum = click + 1
  //     sl.style.marginLeft = `-${(marginLeft + parseInt(gap)) * sum}px`
  //   }
  // }

  // const handePrevSlider = (): void => {
  //   setClicks(click - 1)

  //   if (slider.current !== null) {
  //     const sl = slider.current
  //     const gap = getComputedStyle(sl).columnGap.replace('px', '')
  //     const marginLeft = sl.firstElementChild?.clientWidth ?? 0
  //     const rest = click - 1
  //     sl.style.marginLeft = `-${(marginLeft + parseInt(gap)) * rest}px`
  //   }
  // }

  return (
    <section>
      <div className='flex gap-4 p-7 text-gs_gray text-md font-extralight font-poppins ml-36'>
        <h1 className='opacity-50'>Last realases</h1>
        <span className='opacity-50'>|</span>
        <Link href='/catalog' className='text-gs_orange'>See all</Link>
      </div>
      <div id='slider_releases' className='w-full h-[428px] overflow-hidden relative'>
        {
          click !== 0
            ? <AiOutlineLeft
              fontSize={45}
              fill='#ffffff'
              className='absolute top-1/2 -translate-y-1/2 left-2 z-50 cursor-pointer'
              onClick={handlePrevImage}
            />
            : null
        }
        <div
          className='w-[200%] h-full flex gap-10'
          ref={slider}
        >
          {
            onlyPreviews.map(rls => (
              <Release
                key={rls.id}
                title={rls.title}
                image={rls.poster_path}
                overview={rls.overview}
                id={rls.id}
              />
            ))
          }
        </div>
        {
          click !== 4
            ? <AiOutlineRight
              fontSize={45}
              fill='#ffffff'
              className='absolute top-1/2 -translate-y-1/2 right-2 z-50 cursor-pointer'
              onClick={handleNextImage}
            />
            : null
        }
      </div>
    </section>
  )
}

export {
  ReleasesWrap
}
