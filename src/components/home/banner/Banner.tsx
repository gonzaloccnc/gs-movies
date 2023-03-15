import Image from 'next/image'
import React from 'react'
import { API_URL, type MovieType } from '../../../utils/API'
import { ButtonPrimary } from '../../buttons/ButtonPrimary'

interface BannerProps {
  movieData: MovieType
}

const Banner: React.FC<BannerProps> = ({ movieData }) => {
  return (
    <section className='w-full h-screen relative'>
      <Image
        unoptimized
        priority
        width={1080}
        height={720}
        src={API_URL.IMAGES + movieData.backdrop_path}
        alt={movieData.title}
        className='w-full h-full'
      />
      <div className='absolute top-[40%] left-32 border-l border-white pl-10'>
        <h1 className='font-extralight font-poppins'>It is now Avaliable</h1>
        <p className='text-7xl font-bolds'>{movieData.title}</p>
        <p className='font-extralight font-poppins my-8 w-1/2 text-shadow'>{movieData.overview}</p>
        <ButtonPrimary title='Streaming/Buy' />
      </div>
    </section>
  )
}

export {
  Banner
}
