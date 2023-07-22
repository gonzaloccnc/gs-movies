import { type MovieType, type MoviePlayJSON } from '@/utils/API'
import { axiosClient } from '@/utils/axios'
import { useEffect, useRef, useState } from 'react'
import { AiFillFacebook, AiOutlineClose, AiOutlineLink, AiOutlineTwitter } from 'react-icons/ai'
import { FaPinterestP, FaTumblr } from 'react-icons/fa'
import { TbShare3 } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'

interface TrailerProps {
  id: number
  movie: MovieType
  close: () => void
}

const TrailerPreview: React.FC<TrailerProps> = ({ movie, id, close }) => {
  const [playMovie, setPlayMovie] = useState<MoviePlayJSON | null>(null)
  const shareWrap = useRef<HTMLDivElement | null>(null)
  const trailer = playMovie?.results.find(x => x.type === 'Trailer') ?? null

  const getPlayVideo = async (id: number): Promise<void> => {
    setPlayMovie(null)
    const { data } = await axiosClient.get<MoviePlayJSON>(`${id}/videos`)
    setPlayMovie(data)
  }

  const handleShare = (): void => {
    if (shareWrap.current === null) return
    shareWrap.current.classList.remove('hidden')
    shareWrap.current.classList.add('grid', 'opacity-0')

    setTimeout(() => {
      shareWrap.current?.classList.remove('opacity-0')
    }, 500)
  }

  const handleShareClose = (): void => {
    if (shareWrap.current === null) return
    shareWrap.current.classList.remove('grid', 'opacity-100')
    shareWrap.current.classList.add('hidden')
  }

  useEffect(() => {
    void getPlayVideo(id)
  }, [])

  return (
    <>
      <div
        className='absolute right-5 top-5 cursor-pointer'
        onClick={close}
      >
        <AiOutlineClose className='text-2xl' />
      </div>

      <div
        className='absolute left-5 top-5 flex cursor-pointer items-center gap-2'
        onClick={handleShare}
      >
        <TbShare3 className='text-2xl' />
        <span>Share</span>
      </div>

      {
        (movie !== null && playMovie !== null && trailer !== null)
          ? <section
            className='absolute max-h-80 gap-8
            mobile:top-1/4 mobile:mt-16 mobile:-translate-y-1/4 desktop:left-1/2
            desktop:top-1/2 desktop:flex desktop:w-4/5 desktop:-translate-x-1/2 desktop:-translate-y-1/2'
          >
            <div className='relative mobile:mb-5 desktop:mb-0 desktop:w-3/5'>
              <div className='absolute inset-0 hidden h-full place-content-center bg-gs_black transition-all
                   duration-500'
                ref={shareWrap}
              >
                <AiOutlineClose
                  className='absolute right-2 top-2 cursor-pointer text-2xl'
                  onClick={handleShareClose}
                />
                <h2 className='text-3xl font-light'>Share this video</h2>
                <div className='mt-2 flex items-center justify-evenly text-2xl'>
                  <AiFillFacebook className='cursor-pointer' />
                  <AiOutlineTwitter className='cursor-pointer' />
                  <FaPinterestP className='cursor-pointer' />
                  <FaTumblr className='cursor-pointer' />
                  <AiOutlineLink className='cursor-pointer' />
                </div>
              </div>
              <iframe
                style={{ width: '100%' }}
                className='aspect-video tablet:h-[40vh] desktop:max-h-80'
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
            </div>
            <div className='overflow-y-auto mobile:px-5 desktop:w-2/5 desktop:px-0'>
              <h2 className='mb-5 text-xl font-light'>{movie.title}</h2>
              <p className='font-light'>{movie.overview}</p>
            </div>
          </section>
          : <section
            className='absolute max-h-80 gap-8 mobile:left-1/2 mobile:top-1/4 mobile:mt-16
              mobile:w-full mobile:-translate-x-1/2 mobile:-translate-y-1/4 desktop:top-1/2
              desktop:flex desktop:w-4/5 desktop:-translate-y-1/2 desktop:justify-center'
          >
            <Skeleton
              count={1}
              className='aspect-video w-full tablet:h-[40vh] desktop:h-64'
              baseColor='#ebebeb'
              highlightColor='#fff000'
            />
            <div
              className='mobile:mt-5 mobile:w-full desktop:mt-0 desktop:w-2/5 desktop:px-0'
            >
              <Skeleton
                count={1}
                baseColor='#ebebeb'
                highlightColor='#fff000'
                className='h-8 mobile:w-full desktop:w-[350px]'
              />
              <Skeleton
                count={6}
                baseColor='#ebebeb'
                highlightColor='#fff000'
                className='mobile:w-full desktop:w-[350px]'
              />
            </div>
          </section>
      }

    </>
  )
}

export {
  TrailerPreview
}
