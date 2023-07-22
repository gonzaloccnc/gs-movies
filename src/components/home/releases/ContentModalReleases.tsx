import { type MoviePlayJSON, type MovieType } from '@/utils/API'
import { axiosClient } from '@/utils/axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { BsInfoCircle, BsShareFill } from 'react-icons/bs'
import { PlayCardRelease } from './PlayCardRelease'
import Skeleton from 'react-loading-skeleton'
import { useSlider } from '@/hooks/useSlider'
import Head from 'next/head'

interface ContentModalProps {
  closeModal: () => void
  defaultMovie: MovieType
  movies: MovieType[] | null
}

const ContentModalReleases: React.FC<ContentModalProps> = ({ closeModal, movies, defaultMovie }) => {
  const [changeVideo, setChangeVideo] = useState(defaultMovie.id)
  const [playMovie, setPlayMovie] = useState<MoviePlayJSON | null>(null)
  const {
    click,
    slider,
    handleNextImage,
    handlePrevImage,
    totalObjects
  } = useSlider<HTMLDivElement>()

  const getPlayVideo = async (id: number): Promise<void> => {
    setPlayMovie(null)
    const { data } = await axiosClient.get<MoviePlayJSON>(`${id}/videos`)
    setPlayMovie(data)
  }

  const handleChangeVideo = (id: number): void => {
    setChangeVideo(id)
  }

  const filterMovie = movies?.find(mv => mv.id === (playMovie?.id as number)) ?? null
  const trailer = playMovie?.results.find(x => x.type === 'Trailer') ?? null
  const moviesFilter = movies?.filter(x => x.id !== defaultMovie.id) ?? null

  useEffect(() => {
    void getPlayVideo(changeVideo)
  }, [changeVideo])

  return (
    <>
      <Head>
        <title>GS - Movies: {filterMovie?.title}</title>
      </Head>
      <div className='relative h-full w-full mobile:pt-5 desktop:p-5 desktop:pt-0'>
        <header className='mb-10 flex justify-between mobile:px-5 desktop:px-0  '>
          <div className='flex items-center gap-8'>
            <BsInfoCircle className='cursor-pointer hover:opacity-80' />
            <Link href='/' className='hover:opacity-80'>Login</Link>
            <div className='flex cursor-pointer items-center gap-4 hover:opacity-80'>
              <BsShareFill />
              <span>Share</span>
            </div>
          </div>

          <AiOutlineClose
            onClick={closeModal}
            className='cursor-pointer text-2xl'
          />
        </header>
        {
          (filterMovie != null && playMovie != null && trailer != null)
            ? <section
              className='flex gap-10 mobile:flex-col desktop:mx-auto desktop:w-3/4
              desktop:flex-row'
            >
              <iframe
                className='aspect-video mobile:h-auto mobile:w-full desktop:h-80'
                src={`https://www.youtube-nocookie.com/embed/${trailer?.key}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
              <div
                className='flex flex-col gap-4 overflow-y-auto mobile:max-h-40 mobile:px-5
                tablet:max-h-80 desktop:px-0'
              >
                <h3 className='text-xl font-bold'>
                  {filterMovie?.title}
                </h3>
                <p className='text-sm font-light'>
                  {filterMovie?.overview}
                </p>
              </div>
            </section>
            : <section
              className='flex gap-10 mobile:flex-col desktop:mx-auto desktop:w-3/4
              desktop:flex-row'
            >
              <Skeleton
                count={1}
                className='aspect-video mobile:h-auto mobile:w-full desktop:h-80'
                baseColor='#ebebeb'
                highlightColor='#fff000'
              />
              <div
                className='flex max-h-80 flex-col gap-4 overflow-y-auto mobile:px-5
                desktop:px-0'
              >
                <Skeleton
                  count={1}
                  width={300}
                  height={30}
                  baseColor='#ebebeb'
                  highlightColor='#fff000'
                />
                <Skeleton
                  count={6}
                  width={300}
                  baseColor='#ebebeb'
                  highlightColor='#fff000'
                />
              </div>
            </section>
        }

        <section className='absolute inset-x-0 bottom-0 overflow-hidden mobile:h-40 tablet:h-64 desktop:h-40'>
          {
            click !== 0
              ? <AiOutlineLeft
                fontSize={45}
                fill='#ffffff'
                className='absolute left-2 top-1/2 z-50 -translate-y-1/2 cursor-pointer'
                onClick={handlePrevImage}
              />
              : null
          }
          {/* FIX: EL SLIDER ES ILIMITADO EN EL MODAL YA QUE NO HAY ELEMENTOS DENTRO DEL PADRE */}

          <div className='flex h-full gap-5' ref={slider}>
            {
              moviesFilter === null
                ? null
                : moviesFilter.map(x => (
                  <PlayCardRelease
                    local={false}
                    key={x.id}
                    src={x.backdrop_path}
                    title={x.title}
                    handle={() => { handleChangeVideo(x.id) }}
                  />
                ))
            }
          </div>

          {
            click !== totalObjects
              ? <AiOutlineRight
                fontSize={45}
                fill='#ffffff'
                className='absolute right-2 top-1/2 z-50 -translate-y-1/2 cursor-pointer'
                onClick={handleNextImage}
              />
              : null
          }
        </section>

      </div>
    </>
  )
}

export {
  ContentModalReleases
}
