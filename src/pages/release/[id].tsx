import Head from 'next/head'
import Link from 'next/link'
import { Modal } from '@/components/modals/Modal'
import { Department, type Cast, type CreditsJSON } from '@/types/creditsMovie'
import { API_URL, type MovieType } from '@/utils/API'
import { axiosServer } from '@/utils/axios'
import { type NextPage, type GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsFillStarFill, BsPlayCircle } from 'react-icons/bs'
import { AiOutlineDollar, AiOutlineLeft } from 'react-icons/ai'
import { TrailerPreview } from '@/components/TrailerPreview'

interface ReleaseProps {
  release: MovieType
  credits: Cast | null
}

const ReleasePage: NextPage<ReleaseProps> = ({ release, credits }) => {
  const dateFormat = new Date(release.release_date).getFullYear()
  const [modal, setModal] = useState(false)
  const router = useRouter()

  const showMovie = (): void => {
    setModal(true)
  }

  return (
    <>
      <Head>
        <title>GS - Movies: {release.title}</title>
        <meta name='description' content={release.overview} />
      </Head>
      <section className='mobile:pt-10 desktop:pt-40'>
        <Link
          href='/catalog'
          className='flex items-center gap-1 text-slate-600 mobile:px-5 desktop:px-24'
        >
          <AiOutlineLeft />
          Return to catalog
        </Link>

        <div
          className='flex items-center justify-center mobile:flex-col desktop:mb-40
          desktop:h-[530px] desktop:flex-row desktop:gap-10 desktop:px-24'
        >
          <div className='h-full mobile:w-full desktop:w-3/5'>
            {/* ONLY MOBILE */}
            <div
              className='my-5 flex items-center gap-2 px-5 text-slate-600 desktop:hidden'
            >
              <span>{dateFormat}</span>
              <span className='border-l border-slate-600 pl-2 uppercase'>
                {release.original_language}
              </span>
              <span className='flex items-center gap-2 border-l border-slate-600 pl-2'>
                {
                  credits === null
                    ? (
                      <>
                        {release.vote_average.toFixed(2)}/10
                        <BsFillStarFill className='text-sm text-yellow-600' />
                      </>)
                    : credits.name
                }
              </span>
            </div>

            <h1
              className='my-7 mobile:hidden mobile:px-5 mobile:text-2xl
              tablet:text-5xl desktop:block desktop:px-0'
            >
              {release.title}
            </h1>
            <div
              className='relative bg-cover bg-center mobile:h-[200px] tablet:h-[40vh]'
              style={{ backgroundImage: `url(${API_URL.IMAGES}${release.backdrop_path})` }}
            >
              <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2
                     -translate-y-1/2 items-center gap-5 mobile:text-4xl tablet:text-6xl'
              >
                <BsPlayCircle
                  className='cursor-pointer'
                  onClick={showMovie}
                />
                <a href={release.homepage} target='_blank'>
                  <AiOutlineDollar
                    className='cursor-pointer'
                  />
                </a>

              </div>
            </div>
          </div>

          <div className='w-[1px] animate-line bg-white mobile:hidden desktop:block'></div>

          <div
            className='flex h-full flex-col mobile:mt-5 mobile:gap-10 mobile:px-5
            desktop:mt-0 desktop:w-2/5 desktop:gap-20 desktop:px-0'
          >
            <div>

              <h1 className='mb-5 text-2xl tablet:text-5xl desktop:hidden'>
                {release.title}
              </h1>

              <div
                className='items-center gap-2 text-slate-600 mobile:hidden desktop:flex
                desktop:h-28'
              >
                <span>{dateFormat}</span>
                <span className='border-l border-slate-600 pl-2 uppercase'>
                  {release.original_language}
                </span>
                <span className='flex items-center gap-2 border-l border-slate-600 pl-2'>
                  {
                    credits === null
                      ? (
                        <>
                          {release.vote_average.toFixed(2)}/10
                          <BsFillStarFill className='text-sm text-yellow-600' />
                        </>)
                      : credits.name
                  }
                </span>
              </div>

              <p className='font-light'>
                {release.overview}
              </p>
            </div>

            <div>
              <button
                className='bg-orange-600 px-8 py-2'
                onClick={() => { void router.push('/contact') }}
              >
                Licencia de produccion
              </button>
            </div>

          </div>

        </div>
      </section>

      {
        modal
          ? <Modal>
            <TrailerPreview
              id={release.id}
              movie={release}
              close={() => { setModal(false) }}
            />
          </Modal>
          : null
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ReleaseProps> = async (ctx) => {
  const { id } = ctx.query as { id: string }
  const [rel, cre] = await Promise.all([
    axiosServer.get<MovieType>(id),
    axiosServer.get<CreditsJSON>(id + '/credits')
  ])
  const { data: { cast } } = cre
  const { data } = rel

  const credits = cast.find(x => x.known_for_department === Department.Directing) ?? null

  return {
    props: {
      release: data,
      credits
    }
  }
}

export default ReleasePage
