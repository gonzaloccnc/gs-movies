import { PlayButton } from '@/components/buttons/PlayButton'
import { Modal } from '@/components/modals/Modal'
import { API_URL, type MovieType, type MoviesJSON } from '@/utils/API'
import { axiosClient } from '@/utils/axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { ContentModalReleases } from './ContentModalReleases'

const NextReleases: React.FC = () => {
  const [upcoming, setUpcoming] = useState<MoviesJSON | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const fetchUpcoming = async (): Promise<void> => {
    const { data } = await axiosClient.get<MoviesJSON>('upcoming')
    setUpcoming(data)
  }

  const handleOpenWithDefaultVideo = (): void => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    void fetchUpcoming()
  }, [])

  return (
    <>
      <section
        id='next_releases'
        className='relative w-full mobile:h-[40vh] desktop:h-[600px]'
      >
        {
          upcoming !== null
            ? <Image
              src={API_URL.IMAGES + upcoming.results[0].backdrop_path}
              fill
              alt={upcoming.results[0].title}
              sizes='(max-width: 1200px) 100vw'
            />
            : null
        }
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-shadow mobile:text-3xl desktop:text-6xl'>
            Next releases
          </h1>
          <PlayButton labelButton='Play video' fn={handleOpenWithDefaultVideo}>
            <BsPlayCircle className='destkop:text-4xl mobile:text-3xl' />
          </PlayButton>
        </div>
      </section>
      {
        openModal
          ? (<Modal>
            <ContentModalReleases
              closeModal={handleOpenWithDefaultVideo}
              defaultMovie={upcoming?.results[0] as MovieType}
              movies={upcoming?.results ?? null}
            />
          </Modal>)
          : null
      }
    </>
  )
}

export {
  NextReleases
}
