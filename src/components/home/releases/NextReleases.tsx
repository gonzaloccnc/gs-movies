import { API_URL, type MoviesJSON } from '@/utils/API'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const NextReleases: React.FC = () => {
  const [upcoming, setUpcoming] = useState<MoviesJSON | null>(null)

  const fetchUpcoming = async (): Promise<void> => {
    const req = await fetch(API_URL.MOVIES + 'upcoming', {
      headers: {
        Authorization: 'Bearer ' + (process.env.NEXT_PUBLIC_TOKEN as string)
      }
    })
    const json = await req.json()
    setUpcoming(json)
  }

  useEffect(() => {
    void fetchUpcoming()
  }, [])

  return (
    <section className='w-full h-[540px] relative'>
      {
        upcoming !== null
          ? <Image
            unoptimized
            src={API_URL.IMAGES + upcoming.results[5].backdrop_path}
            fill
            alt={upcoming.results[5].title}
          />
          : null
      }
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-6xl text-shadow'>Next releases</h1>
        {
          // play video and more videos links modals
        }
      </div>
    </section>
  )
}

export {
  NextReleases
}
