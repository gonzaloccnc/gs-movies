import { API_URL, type MovieType } from '@/utils/API'
import { axiosServer } from '@/utils/axios'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { AiOutlineDollar, AiOutlineLeft } from 'react-icons/ai'
import { BsPlayCircle, BsFillStarFill } from 'react-icons/bs'

interface ReleaseProps {
  release: MovieType
}

const ReleasePage: FC<ReleaseProps> = ({ release }) => {
  const dateFormat = new Date(release.release_date).getFullYear()
  const router = useRouter()

  const showMovie = (): void => {

  }

  return (
    <>
      <Head>
        <title>GS - Movies: {release.title}</title>
        <meta name='description' content={release.overview} />
      </Head>
      <section className='pt-40'>
        <Link href='/catalog' className='px-24 flex items-center gap-1 text-slate-600'>
          <AiOutlineLeft />
          Return to catalog
        </Link>

        <div className='flex px-24 mb-40 items-center justify-center gap-10 h-[450px]'>
          <div className='w-3/5 h-full'>
            <h1 className='text-5xl h-28 flex items-center'>{release.title}</h1>
            <div className='relative h-[360px]'>
              <Image
                priority
                quality={10}
                fill
                src={`${API_URL.IMAGES}${release.backdrop_path}`}
                sizes='(max-width: 1200px) 100%'
                alt={release.title}
              />
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     flex gap-5 items-center'
              >
                <BsPlayCircle
                  className='text-6xl cursor-pointer'
                  onClick={showMovie}
                />
                <a href={release.homepage} target='_blank'>
                  <AiOutlineDollar
                    className='text-6xl cursor-pointer'
                  />
                </a>

              </div>
            </div>
          </div>

          <div className='w-[1px] bg-white h-full'></div>

          <div className='w-2/5 h-full flex flex-col gap-20'>
            <div>
              <div className='h-28 flex items-center gap-2 text-slate-600'>
                <span>{dateFormat}</span>
                <span className='border-l border-slate-600 pl-2 uppercase'>
                  {release.original_language}
                </span>
                <span className='border-l border-slate-600 pl-2 flex items-center gap-2'>
                  {release.vote_average.toFixed(2)}/10
                  <BsFillStarFill className='text-sm text-yellow-600' />
                </span>
              </div>
              <p className='font-light'>
                {release.overview}
              </p>
            </div>

            <div>
              <button className='bg-orange-600 py-2 px-8' onClick={() => { void router.push('/contact') }}>
                Licencia de produccion
              </button>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ release: MovieType }> = async (ctx) => {
  const { id } = ctx.query as { id: string }
  // https:// api.themoviedb.org/3/movie/{movie_id}/credits
  const { data } = await axiosServer.get<MovieType>(id)

  return {
    props: {
      release: data
    }
  }
}

export default ReleasePage
