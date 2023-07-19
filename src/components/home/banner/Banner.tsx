import { Introducing } from '@/components/Introducing'
import { useRouter } from 'next/router'
import React from 'react'
import { API_URL, type MovieType } from '../../../utils/API'
import { ButtonPrimary } from '../../buttons/ButtonPrimary'
interface BannerProps {
  movieData: MovieType
}

const Banner: React.FC<BannerProps> = ({ movieData }) => {
  const route = useRouter()
  const srcImage = API_URL.IMAGES + movieData.backdrop_path

  return (
    <section
      className='w-full h-screen bg-cover'
      style={{ backgroundImage: `url(${srcImage})` }}
    >
      <Introducing
        label='It is now Available'
        title={movieData.title}
        content={movieData.overview}
      >
        <ButtonPrimary
          title='Streaming/Buy'
          ownClass='mt-8'
          handle={() => { void route.push('/buy/streaming') }}
        />
      </Introducing>
    </section>
  )
}

export {
  Banner
}
