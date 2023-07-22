import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '@/utils/Font'
import { ButtonPrimary } from '@/components/buttons/ButtonPrimary'
import { useRouter } from 'next/router'
import { type NextPage, type GetServerSideProps } from 'next'
import { axiosClient, axiosServer } from '@/utils/axios'
import { CardMovie } from '@/components/cards/CardMovie'
import { type MoviesJSON } from '../../utils/API'
import debounce from 'just-debounce-it'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

interface CatalogProps {
  movies: MoviesJSON
}

const CatalogPage: NextPage<CatalogProps> = ({ movies }) => {
  const router = useRouter()
  const [moviesPersist, setMovies] = useState(movies.results)
  const [page, setPage] = useState(1)
  const [scroll, setScroll] = useState(0)
  const clientHeight = useRef(0)

  const handleScroll = (): void => {
    setScroll(window.scrollY)
  }

  const handleToTop = (): void => {
    scrollTo(0, 0)
  }

  const updatePage = useCallback(debounce(() => {
    if (page + 1 >= movies.total_pages) return
    setPage(prev => prev + 1)
  }, 500), [])

  const fetchMoreMovies = async (): Promise<void> => {
    const { data } = await axiosClient.get<MoviesJSON>(`now_playing?page=${page}`)
    setMovies(prev => ([...prev, ...data.results]))
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    clientHeight.current = window.innerHeight
    return () => { document.removeEventListener('scroll', handleScroll) }
  }, [])

  useEffect(() => {
    if (page === 1) return

    void fetchMoreMovies()
  }, [page])

  return (
    <>
      <Head>
        <title>GS - Movies: Catalog</title>
      </Head>
      <section className='w-full desktop:h-screen'>
        <Introducing
          label='Catalog'
          title='Our work'
          content={LoremText}
        >
          <ButtonPrimary
            title='Contact us'
            ownClass='mt-8 px-10'
            handle={() => { void router.push('/contact') }}
          />
        </Introducing>
      </section>

      <section
        className='grid gap-x-8 mobile:grid-cols-1 mobile:gap-y-8 mobile:px-5
        desktop:grid-cols-4 desktop:gap-y-16 desktop:px-0'
      >
        {
          moviesPersist.map((x, i) => (
            <CardMovie
              key={x.id}
              title={x.title}
              id={x.id}
              year={x.release_date}
              content={x.overview}
              src={x.backdrop_path}
              isLast={i === moviesPersist.length - 1}
              newLimit={updatePage}
            />
          ))
        }
      </section>
      {
        scroll > clientHeight.current * 3
          ? <div className='fixed bottom-5 left-5 z-50 cursor-pointer rounded-full bg-white'>
            <BsFillArrowUpCircleFill
              className='text-4xl text-gs_orange'
              onClick={handleToTop}
            />
          </div>
          : null
      }

    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ movies: MoviesJSON }> = async (ctx) => {
  const { data } = await axiosServer.get<MoviesJSON>('now_playing')

  return {
    props: {
      movies: data
    }
  }
}

export default CatalogPage
