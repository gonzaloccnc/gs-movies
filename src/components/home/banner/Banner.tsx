import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { API_URL, type MovieType } from '../../../utils/API'
import { ButtonPrimary } from '../../buttons/ButtonPrimary'

interface BannerProps {
  movieData: MovieType
}

const Banner: React.FC<BannerProps> = ({ movieData }) => {
  const route = useRouter()

  return (
    <section className='w-full h-screen relative'>
      <Image
        priority
        fill
        src={API_URL.IMAGES + movieData.backdrop_path}
        alt={movieData.title}
        className='w-full h-full'
      />
      <div className='absolute top-[50%] left-32 border-l border-white pl-10 -translate-y-1/2'>
        <h1 className='font-medium font-poppins text-shadow'>It is now Avaliable</h1>
        <p className='text-7xl font-bolds text-shadow'>{movieData.title}</p>
        <p className='font-medium font-poppins my-8 w-1/2 text-shadow'>{movieData.overview}</p>
        <ButtonPrimary
          title='Streaming/Buy'
          handle={() => { void route.push('/buy/streaming') }}
        />
      </div>
    </section>
  )
}

export {
  Banner
}
