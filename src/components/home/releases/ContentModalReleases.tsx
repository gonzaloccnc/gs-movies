import { API_URL, type MoviePlayJSON, type MovieType } from '@/utils/API'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsInfoCircle, BsShareFill } from 'react-icons/bs'

interface ContentModalProps {
  closeModal: () => void
  defaultMovie: MovieType
  movies: MovieType[]
}

const ContentModalReleases: React.FC<ContentModalProps> = ({ closeModal, movies, defaultMovie }) => {
  const [playMovie, setPlayMovie] = useState<MoviePlayJSON | null>(null)

  const getPlayVideo = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL.MOVIES}${id}/videos`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN as string}`
      }
    })

    const json = await res.json() as MoviePlayJSON
    setPlayMovie(json)
  }

  const filterMovie = movies.find(mv => mv.id === (playMovie?.id as number))

  useEffect(() => {
    void getPlayVideo(defaultMovie.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full p-5'>
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

      <section className='flex gap-10 w-3/4 mx-auto'>
        <iframe
          className='aspect-video'
          height={320}
          src={`https://youtube.com/embed/${playMovie?.results[1].key as string}`}
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

      <section className='flex'>
        {
          movies.map(mv => (
            <div key={mv.id}>
              <Image
                width={300}
                height={220}
                src={`${API_URL.IMAGES_W}${mv.backdrop_path}`}
                alt={mv.title}
                unoptimized
              />
            </div>
          ))
        }
      </section>

    </div>
  )
}

export default ContentModalReleases