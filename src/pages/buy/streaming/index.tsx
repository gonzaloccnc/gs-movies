import { type FC, useState } from 'react'
import Head from 'next/head'
import { PlayButton } from '@/components/buttons/PlayButton'
import { BsInfoLg, BsPlayCircle, BsShareFill } from 'react-icons/bs'
import { type GetServerSideProps } from 'next'
import { axiosServer } from '@/utils/axios'
import { API_URL, type MovieType, type MoviesJSON } from '@/utils/API'
import { CardTopRated } from '@/components/cards/CardTopRated'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '../../../utils/Font'
import { Modal } from '@/components/modals/Modal'
import { ContentModalReleases } from '@/components/home/releases/ContentModalReleases'

interface StreamingProps {
  data: MoviesJSON
}

const StreamingPage: FC<StreamingProps> = ({ data }) => {
  const topRated = [...data.results].slice(0, 9)
  const [modal, setModal] = useState<boolean>(false)
  const [defaultMovie, setDefault] = useState<MovieType | null>(null)

  const setOpenDefault = (): void => {
    setDefault(null)
    setModal(true)
  }

  const handleChangeDefault = (movie: MovieType): void => {
    setDefault(movie)
    setModal(true)
  }

  return (
    <>
      <Head>
        <title>GS - Movies: Streaming</title>
      </Head>
      <section className='w-full desktop:h-screen relative'>
        <Introducing
          label='GS Originals'
          title='See our original content online'
          content={LoremText}
        >
        </Introducing>
      </section>

      <section className='w-full desktop:h-[90vh] desktop:mt-20 bg-banner mobile:h-[60vh]'>
        <div className='w-full h-3/4 flex flex-col justify-center items-center'>
          <h1 className='text-center dekstop:text-7xl mb-8 mobile:text-5xl'>
            GS Originals
          </h1>
          <PlayButton labelButton='Preview' fn={setOpenDefault}>
            <BsPlayCircle className='desktop:text-4xl mobile:text-3xl' />
          </PlayButton>
        </div>

        <div
          className='w-full h-[25%] desktop:flex items-center justify-between px-10
          mobile:hidden'
        >
          <div>
            <input
              type='search'
              placeholder='Search video'
              className='bg-transparent border-b py-2 px-1 outline-none placeholder-white' />
          </div>
          <div className='flex'>
            <span className='border-r border-white px-3'>
              <BsShareFill fontSize={20} />
            </span>
            <span className='border-r border-white px-3'>
              <BsInfoLg fontSize={20} />
            </span>
          </div>
          <div>
            <select
              name='categories'
              id='categories'
              className='bg-transparent border-b py-2 px-1 outline-none'
              defaultValue='categorias'
            >
              <option disabled value='categorias' hidden>Categorias</option>
            </select>
          </div>
        </div>
      </section>

      <section className='w-full desktop:grid desktop:grid-cols-3 mobile:grid-cols-1'>
        {
          topRated.map(x => (
            <CardTopRated
              key={x.id}
              src={API_URL.IMAGES_W + x.backdrop_path}
              title={x.title}
              homepage={x.homepage}
              handle={() => { handleChangeDefault(x) }}
            />
          ))
        }
      </section>

      {
        modal
          ? <Modal>
            <ContentModalReleases
              movies={data.results}
              closeModal={() => { setModal(false) }}
              defaultMovie={defaultMovie ?? data.results[0]}
            />
          </Modal>
          : null
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axiosServer.get<MoviesJSON>('top_rated')

  return {
    props: {
      data
    }
  }
}

export default StreamingPage
