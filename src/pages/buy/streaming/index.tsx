import { type FC } from 'react'
import Head from 'next/head'
import { PlayButton } from '@/components/buttons/PlayButton'
import { BsInfoLg, BsPlayCircle, BsShareFill } from 'react-icons/bs'
import { type GetServerSideProps } from 'next'
import { axiosServer } from '@/utils/axios'
import { API_URL, type MoviesJSON } from '@/utils/API'
import { CardTopRated } from '@/components/cards/CardTopRated'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '../../../utils/Font'

interface StreamingProps {
  data: MoviesJSON
}

const StreamingPage: FC<StreamingProps> = ({ data }) => {
  const topRated = [...data.results].slice(0, 9)

  return (
    <>
      <Head>
        <title>GS - Movies: Streaming</title>
      </Head>
      <section className='w-full h-screen relative'>
        <Introducing
          label='GS Originals'
          title='See our original content online'
          content={LoremText}
        >
        </Introducing>
      </section>

      <section className='w-full h-[90vh] mt-20 bg-banner'>
        <div className='w-full h-3/4 flex flex-col justify-center items-center'>
          <h1 className='text-center text-7xl mb-8'>GS Originals</h1>
          <PlayButton labelButton='Preview' fn={() => { }}>
            <BsPlayCircle fontSize={40} />
          </PlayButton>
        </div>

        <div className='w-full h-[25%] flex items-center justify-between px-10'>
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

      <section className='w-full grid grid-cols-3'>
        {
          topRated.map(x => (
            <CardTopRated
              key={x.id}
              src={API_URL.IMAGES_W + x.backdrop_path}
              title={x.title}
              homepage={x.homepage}
            />
          ))
        }
      </section>
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
