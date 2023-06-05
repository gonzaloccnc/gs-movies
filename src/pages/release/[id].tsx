
import { API_URL, type MovieType } from '@/utils/API'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, type FC } from 'react'

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

  useEffect(() => {
    void getRelease()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <Link href='/'>Return to home</Link>
      <div className='flex'>
        <div>
          <h1 className='text-4xl'>{release?.title}</h1>
          <Image
            width={300}
            height={300}
            src={`${API_URL.IMAGES}${release?.backdrop_path as string}`}
            unoptimized
            alt={release?.title as string}
          />
        </div>
        <div>
          <p className='font-light'>
            {release?.overview}
          </p>
          <button>Licencia de produccion</button>
        </div>
      </div>
    </section>
  )
}

export default ReleasePage
