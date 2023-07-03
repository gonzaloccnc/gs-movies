import { Newsletter } from '@/components/newsletter/Newsletter'
import { API_URL, type MovieType } from '@/utils/API'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, type FC } from 'react'
import { AiOutlineDollar, AiOutlineLeft } from 'react-icons/ai'
import { BsPlayCircle } from 'react-icons/bs'

// make functionality for play movie and buy movie, before make loader for all page

const ReleasePage: FC = () => {
  const [release, setReleases] = useState<MovieType | null>(null)
  const router = useRouter()

  const getRelease = async (): Promise<void> => {
    const data = await fetch(`${API_URL.MOVIES}${router.query.id as string}`, {
      headers: {
        Authorization: 'Bearer ' + (process.env.NEXT_PUBLIC_TOKEN as string)
      }
    })
    const json = await data.json() as MovieType
    setReleases(json)
  }

  const showMovie = (): void => {

  }

  useEffect(() => {
    void getRelease()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(release)
  return (
    <section className='pt-40'>
      <Link href='/' className='px-24 flex items-center gap-1 text-slate-600'>
        <AiOutlineLeft />
        Return to home
      </Link>

      <div className='flex px-24 mb-40 items-center justify-center gap-10 h-[450px]'>
        <div className='w-3/5 h-full'>
          <h1 className='text-5xl h-28 flex items-center'>{release?.title}</h1>
          <div className='relative'>
            <Image
              width={635}
              height={360}
              src={`${API_URL.IMAGES}${release?.backdrop_path as string}`}
              alt={release?.title as string}
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              flex gap-5 items-center'>
              <BsPlayCircle
                className='text-6xl cursor-pointer'
                onClick={showMovie}
              />
              <Link href={release?.homepage ?? ''} rel='noopener noreferrer' target='_blank'>
                <AiOutlineDollar
                  className='text-6xl cursor-pointer'
                />
              </Link>
            </div>
          </div>
        </div>

        <div className='w-[1px] bg-white h-full'></div>

        <div className='w-2/5 h-full flex flex-col gap-20'>
          <div>
            <div className='h-28 flex items-center gap-2 text-slate-600'>
              <span>2h 15m</span>
              <span className='border-l border-slate-600 pl-2'>Spanish</span>
              <span className='border-l border-slate-600 pl-2'>Carlos alcantara</span>
            </div>
            <p className='font-light'>
              {release?.overview}
            </p>
          </div>

          <div>
            <button className='bg-orange-600 py-2 px-8'>
              Licencia de produccion
            </button>
          </div>

        </div>

      </div>

      <Newsletter />
    </section>
  )
}

export default ReleasePage
