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
        className='absolute top-5 right-5 cursor-pointer'
        onClick={close}
      >
        <AiOutlineClose className='text-2xl' />
      </div>

      <div
        className='absolute top-5 left-5 cursor-pointer flex gap-2 items-center'
        onClick={handleShare}
      >
        <TbShare3 className='text-2xl' />
        <span>Share</span>
      </div>

      {
        (movie !== null && playMovie !== null && trailer !== null)
          ? <section
            className='absolute dekstop:top-1/2 dekstop:left-1/2
            dekstop:-translate-x-1/2 dekstop:-translate-y-1/2 desktop:flex dekstop:w-4/5
            gap-8 max-h-80 mobile:mt-16 mobile:top-1/4 mobile:-translate-y-1/4'
          >
            <div className='desktop:w-3/5 relative mobile:mb-5 desktop:mb-0'>
              <div className='absolute h-full top-0 bottom-0 left-0 right-0 bg-gs_black
                   place-content-center hidden transition-all duration-500'
                ref={shareWrap}
              >
                <AiOutlineClose
                  className='text-2xl absolute top-2 right-2 cursor-pointer'
                  onClick={handleShareClose}
                />
                <h2 className='text-3xl font-light'>Share this video</h2>
                <div className='flex items-center text-2xl justify-evenly mt-2'>
                  <AiFillFacebook className='cursor-pointer' />
                  <AiOutlineTwitter className='cursor-pointer' />
                  <FaPinterestP className='cursor-pointer' />
                  <FaTumblr className='cursor-pointer' />
                  <AiOutlineLink className='cursor-pointer' />
                </div>
              </div>
              <iframe
                style={{ width: '100%' }}
                className='aspect-video max-h-80'
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
            </div>
            <div className='desktop:w-2/5 overflow-y-auto mobile:px-5 desktop:px-0'>
              <h2 className='text-xl font-light mb-5'>{movie.title}</h2>
              <p className='font-light'>{movie.overview}</p>
            </div>
          </section>
          : <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-4/5 gap-8 max-h-80'>
            <Skeleton
              count={1}
              className='aspect-video'
              height={320}
              baseColor='#ebebeb'
              highlightColor='#fff000'
            />
            <div className='w-2/5 overflow-y-auto flex flex-col gap-5'>
              <Skeleton
                count={1}
                width={350}
                height={30}
                baseColor='#ebebeb'
                highlightColor='#fff000'
              />
              <Skeleton
                count={6}
                width={350}
                baseColor='#ebebeb'
                highlightColor='#fff000'
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
