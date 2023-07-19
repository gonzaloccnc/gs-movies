import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@/components/modals/Modal'
import { Department, type Cast, type CreditsJSON } from '@/types/creditsMovie'
import { API_URL, type MovieType } from '@/utils/API'
import { axiosServer } from '@/utils/axios'
import { type GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, type FC } from 'react'
import { BsFillStarFill, BsPlayCircle } from 'react-icons/bs'
import { AiOutlineDollar, AiOutlineLeft } from 'react-icons/ai'
import { TrailerPreview } from '@/components/TrailerPreview'

interface ReleaseProps {
  release: MovieType
  credits: Cast | null
}

// REFACTORIZAR ESTO MOBILE Y MUCHOS DIVS Y ESTILOS

const ReleasePage: FC<ReleaseProps> = ({ release, credits }) => {
  const dateFormat = new Date(release.release_date).getFullYear()
  const [modal, setModal] = useState<boolean>(false)
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
      <section className='desktop:pt-40 mobile:pt-10'>
        <Link
          href='/catalog'
          className='desktop:px-24 flex items-center gap-1 text-slate-600 mobile:px-5'
        >
          <AiOutlineLeft />
          Return to catalog
        </Link>

        <div
          className='flex desktop:px-24 desktop:mb-40 items-center justify-center
          desktop:gap-10 desktop:h-[530px] desktop:flex-row mobile:flex-col'
        >
          <div className='desktop:w-3/5 h-full mobile:w-full'>
            {/* ONLY MOBILE */}
            <div
              className='desktop:hidden flex items-center gap-2 text-slate-600 px-5 my-5'
            >
              <span>{dateFormat}</span>
              <span className='border-l border-slate-600 pl-2 uppercase'>
                {release.original_language}
              </span>
              <span className='border-l border-slate-600 pl-2 flex items-center gap-2'>
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
              className='desktop:text-5xl desktop:block my-7 mobile:text-2xl
              mobile:px-5 desktop:px-0 mobile:hidden'
            >
              {release.title}
            </h1>
            <div className='relative desktop:h-[360px] mobile:h-[200px]'>
              <Image
                priority
                quality={10}
                fill
                src={`${API_URL.IMAGES}${release.backdrop_path}`}
                sizes='(max-width: 1200px) 100%'
                alt={release.title}
              />
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     flex gap-5 items-center desktop:text-6xl mobile:text-4xl'
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

          <div className='mobile:hidden desktop:block w-[1px] bg-white animate-line'></div>

          <div
            className='desktop:w-2/5 h-full flex flex-col desktop:gap-20 mobile:gap-10
            mobile:px-5 desktop:px-0 mobile:mt-5 desktop:mt-0'
          >
            <div>

              <h1 className='mb-5 text-2xl desktop:hidden'>
                {release.title}
              </h1>

              <div
                className='desktop:h-28 items-center gap-2 text-slate-600 mobile:hidden
                desktop:flex'
              >
                <span>{dateFormat}</span>
                <span className='border-l border-slate-600 pl-2 uppercase'>
                  {release.original_language}
                </span>
                <span className='border-l border-slate-600 pl-2 flex items-center gap-2'>
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
                className='bg-orange-600 py-2 px-8'
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
