import { type MovieType } from '@/utils/API'
import Link from 'next/link'
import React from 'react'
import { Release } from './Release'

interface ReleasesWrapProps {
  releases: MovieType[]
}

const ReleasesWrap: React.FC<ReleasesWrapProps> = ({ releases }) => {
  return (
    <section>
      <div className='flex gap-4 p-7 text-gs_gray text-md font-extralight font-poppins ml-36'>
        <h1 className='opacity-50'>Last realases</h1>
        <span className='opacity-50'>|</span>
        <Link href='/catalog' className='text-gs_orange'>See all</Link>
      </div>
      <div id='slider_releases' className='flex gap-10 overflow-hidden'>
        {
          releases.map(rls => (
            <Release
              key={rls.id}
              title={rls.title}
              image={rls.poster_path}
              overview={rls.overview}
            />
          ))
        }
      </div>
    </section>
  )
}

export {
  ReleasesWrap
}
