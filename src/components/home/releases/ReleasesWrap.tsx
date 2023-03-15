import { type MovieType } from '@/utils/API'
import Link from 'next/link'
import React, { useRef } from 'react'
import { Release } from './Release'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface ReleasesWrapProps {
  releases: MovieType[]
}

// interface SliderState {
//   first: boolean
//   mainMargin: '-26%'
//   commonMargin: '-15%'
// }

const ReleasesWrap: React.FC<ReleasesWrapProps> = ({ releases }) => {
  // const [sliderState, setSliderState] = useState<SliderState>({
  //   first: true,
  //   mainMargin: '-26%',
  //   commonMargin: '-15%'
  // })
  const onlyPreviews = [...releases].slice(0, 8)
  const slider = useRef<HTMLDivElement>(null)

  const hadnleNextImage = (): void => {
    if (slider.current !== null) {
      const sl = slider.current
      sl.style.marginLeft = '-25%'
    }
  }

  return (
    <section>
      <div className='flex gap-4 p-7 text-gs_gray text-md font-extralight font-poppins ml-36'>
        <h1 className='opacity-50'>Last realases</h1>
        <span className='opacity-50'>|</span>
        <Link href='/catalog' className='text-gs_orange'>See all</Link>
      </div>
      <div id='slider_releases' className='w-full h-[428px] overflow-hidden relative'>
        <AiOutlineLeft
          fontSize={45}
          fill='#ffffff'
          className='absolute top-1/2 -translate-y-1/2 left-2 z-50 cursor-pointer'
          onClick={hadnleNextImage}
        />
        <div className='w-[200%] h-full flex gap-10' ref={slider}>
          {
            onlyPreviews.map(rls => (
              <Release
                key={rls.id}
                title={rls.title}
                image={rls.poster_path}
                overview={rls.overview}
              />
            ))
          }
        </div>
        <AiOutlineRight
          fontSize={45}
          fill='#ffffff'
          className='absolute top-1/2 -translate-y-1/2 right-2 z-50 cursor-pointer'
          onClick={hadnleNextImage}
        />
      </div>
    </section>
  )
}

export {
  ReleasesWrap
}
