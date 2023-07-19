import { type MoviePlayJSON, type MovieType } from '@/utils/API'
import { axiosClient } from '@/utils/axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { BsInfoCircle, BsShareFill } from 'react-icons/bs'
import { PlayCardRelease } from './PlayCardRelease'
import Skeleton from 'react-loading-skeleton'
import { useSlider } from '@/hooks/useSlider'
import Head from 'next/head'

interface ContentModalProps {
  closeModal: () => void
  defaultMovie: MovieType
  movies: MovieType[]
}

// TODO: OPTIMIZAR

const ContentModalReleases: React.FC<ContentModalProps> = ({ closeModal, movies, defaultMovie }) => {
  const [changeVideo, setChangeVideo] = useState<number>(defaultMovie.id)
  const [playMovie, setPlayMovie] = useState<MoviePlayJSON | null>(null)
  const { click, slider, handleNextImage, handlePrevImage } = useSlider<HTMLDivElement>()

  const getPlayVideo = async (id: number): Promise<void> => {
    setPlayMovie(null)

    const { data } = await axiosClient.get<MoviePlayJSON>(`${id}/videos`)

    setPlayMovie(data)
  }

  const handleChangeVideo = (id: number): void => {
    setChangeVideo(id)
  }

  const filterMovie = movies.find(mv => mv.id === (playMovie?.id as number)) ?? null
  const trailer = playMovie?.results.find(x => x.type === 'Trailer') ?? null

  useEffect(() => {
    void getPlayVideo(changeVideo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeVideo])

  return (
    <>
      <Head>
        <title>GS - Movies: {filterMovie?.title}</title>
      </Head>
      <div className='w-full h-full p-5 relative'>
        <header className='flex justify-between mb-10'>
          <div className='flex gap-8 items-center'>
            <BsInfoCircle className='cursor-pointer hover:opacity-80' />
            <Link href='/' className='hover:opacity-80'>Login</Link>
            <div className='flex items-center gap-4 hover:opacity-80 cursor-pointer'>
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
            ? <section className='flex gap-10 w-3/4 mx-auto'>
              <iframe
                className='aspect-video'
                height={320}
                src={`https://youtube.com/embed/${trailer?.key}`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
              <div className='flex flex-col gap-4 max-h-80 overflow-y-auto'>
                <h3 className='text-xl font-bold'>
                  {filterMovie?.title}
                </h3>
                <p className='text-sm font-light'>
                  {filterMovie?.overview}
                </p>
              </div>
            </section>
            : <section className='flex gap-10 w-3/4 mx-auto'>
              <Skeleton
                count={1}
                className='aspect-video'
                height={320}
                baseColor='#ebebeb'
                highlightColor='#fff000'
              />
              <div className='flex flex-col gap-4 max-h-80 overflow-y-auto'>
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

        <section className='w-full overflow-hidden absolute left-0 bottom-0 h-40'>
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

          <div className='w-[1000%] flex gap-5 h-full' ref={slider}>
            {
              movies.map(mv => (
                <PlayCardRelease
                  local={false}
                  key={mv.id}
                  src={mv.backdrop_path}
                  title={mv.title}
                  handle={() => { handleChangeVideo(mv.id) }}
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
        </section>

      </div>
    </>
  )
}

export {
  ContentModalReleases
}
