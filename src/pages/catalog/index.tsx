import { useCallback, useEffect, useRef, useState, type FC } from 'react'
import Head from 'next/head'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '@/utils/Font'
import { ButtonPrimary } from '@/components/buttons/ButtonPrimary'
import { useRouter } from 'next/router'
import { type GetServerSideProps } from 'next'
import { axiosClient, axiosServer } from '@/utils/axios'
import { CardMovie } from '@/components/cards/CardMovie'
import { type MoviesJSON, type MovieType } from '../../utils/API'
import debounce from 'just-debounce-it'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

interface CatalogProps {
  movies: MoviesJSON
}

const CatalogPage: FC<CatalogProps> = ({ movies }) => {
  const router = useRouter()
  const [moviesPersist, setMovies] = useState<MovieType[]>(movies.results)
  const [page, setPage] = useState<number>(1)
  const [scroll, setScroll] = useState<number>(0)
  const clientHeight = useRef<number>(0)

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
      <section className='w-full h-screen'>
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

      <section className='grid grid-cols-4 gap-x-8 gap-y-16'>
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
          ? <div className='fixed bottom-5 left-5 z-50 bg-white rounded-full cursor-pointer'>
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
