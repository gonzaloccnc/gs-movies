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

  return (
    <section>
      <div
        className='flex gap-4 desktop:py-7 text-gs_gray text-md font-extralight desktop:ml-36
        mobile:mx-5 mobile:py-4'
      >
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
              className='absolute top-1/2 -translate-y-1/2 left-2 z-30 cursor-pointer'
              onClick={handlePrevImage}
            />
            : null
        }
        <div
          className='h-full flex gap-10'
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
              className='absolute top-1/2 -translate-y-1/2 right-2 z-30 cursor-pointer'
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
