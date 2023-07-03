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
      className='w-[285px] h-full shrink-0 relative cursor-pointer'
      onClick={handleNavigate}
    >
      <Image
        fill
        src={API_URL.IMAGES_W + image}
        alt={title}
        priority
      />
      <div
        className='w-full h-full absolute top-0 bg-gs_black flex
        text-xs font-poppins font-extralight opacity-0 hover:opacity-100 transition-all
        duration-300'
      >
        <div className='px-3 absolute bottom-5'>
          <h1 className='mb-3 font-bold'>{title}</h1>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  )
}

export {
  Release
}
