import { Modal } from '@/components/modals/Modal'
import { API_URL, type MovieType, type MoviesJSON } from '@/utils/API'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import ContentModalReleases from './ContentModalReleases'

const NextReleases: React.FC = () => {
  const [upcoming, setUpcoming] = useState<MoviesJSON | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const fetchUpcoming = async (): Promise<void> => {
    const req = await fetch(API_URL.MOVIES + 'upcoming', {
      headers: {
        Authorization: 'Bearer ' + (process.env.NEXT_PUBLIC_TOKEN as string)
      }
    })
    const json = await req.json()
    setUpcoming(json)
  }

  const handleOpenWithDefaultVideo = (): void => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    void fetchUpcoming()
  }, [])

  return (
    <>
      <section className='w-full h-[600px] relative'>
        {
          upcoming !== null
            ? <Image
              unoptimized
              src={API_URL.IMAGES + upcoming.results[0].backdrop_path}
              fill
              alt={upcoming.results[0].title}
            />
            : null
        }
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-6xl text-shadow'>Next releases</h1>
          <div className='flex items-center gap-3 justify-center'>
            <BsPlayCircle fontSize={40} />
            <button
              type='button'
              className='underline underline-offset-8 text-xl text-shadow'
              onClick={handleOpenWithDefaultVideo}
            >
              Play video
            </button>
          </div>
        </div>
      </section>
      {
        openModal
          ? <Modal>
            <ContentModalReleases
              closeModal={handleOpenWithDefaultVideo}
              defaultMovie={upcoming?.results[0] as MovieType}
              movies={upcoming?.results as MovieType[]}
            />
          </Modal>
          : null
      }
    </>
  )
}

export {
  NextReleases
}
