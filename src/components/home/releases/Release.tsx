import { API_URL } from '@/utils/API'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface ReleasesProps {
  title: string
  image: string
  overview: string
  id: number
}

const Release: React.FC<ReleasesProps> = ({ title, image, overview, id }) => {
  const router = useRouter()

  const handleNavigate = (): void => {
    void router.push(`/release/${id}`)
  }

  return (
    <div
      className='relative h-full w-[285px] shrink-0 cursor-pointer'
      onClick={handleNavigate}
    >
      <Image
        fill
        src={API_URL.IMAGES_W + image}
        alt={title}
        priority
        sizes='(max-width: 1200px) 100%'
      />
      <div
        className='absolute top-0 flex h-full w-full bg-gs_black
        text-xs font-extralight opacity-0 transition-all duration-300
        hover:opacity-100'
      >
        <div className='absolute bottom-5 px-3'>
          <h2 className='mb-3 font-bold'>{title}</h2>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  )
}

export {
  Release
}
