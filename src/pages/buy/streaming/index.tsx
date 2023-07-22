import { useState } from 'react'
import Head from 'next/head'
import { PlayButton } from '@/components/buttons/PlayButton'
import { BsInfoLg, BsPlayCircle, BsShareFill } from 'react-icons/bs'
import { type NextPage, type GetServerSideProps } from 'next'
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

const StreamingPage: NextPage<StreamingProps> = ({ data }) => {
  const topRated = [...data.results].slice(0, 9)
  const [modal, setModal] = useState(false)
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
      <section className='relative w-full desktop:h-screen'>
        <Introducing
          label='GS Originals'
          title='See our original content online'
          content={LoremText}
        >
        </Introducing>
      </section>

      <section className='w-full bg-banner mobile:h-[60vh] desktop:mt-20 desktop:h-[90vh]'>
        <div className='flex h-3/4 w-full flex-col items-center justify-center'>
          <h1 className='dekstop:text-7xl mb-8 text-center mobile:text-5xl'>
            GS Originals
          </h1>
          <PlayButton labelButton='Preview' fn={setOpenDefault}>
            <BsPlayCircle className='mobile:text-3xl desktop:text-4xl' />
          </PlayButton>
        </div>

        <div
          className='h-[25%] w-full items-center justify-between px-10 mobile:hidden
          desktop:flex'
        >
          <div>
            <input
              type='search'
              placeholder='Search video'
              className='border-b bg-transparent px-1 py-2 outline-none placeholder:text-white' />
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
              className='border-b bg-transparent px-1 py-2 outline-none'
              defaultValue='categorias'
            >
              <option disabled value='categorias' hidden>Categorias</option>
            </select>
          </div>
        </div>
      </section>

      <section className='w-full mobile:grid-cols-1 desktop:grid desktop:grid-cols-3'>
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
