import { API_URL } from '@/utils/API'
import Image from 'next/image'
import React from 'react'

interface ReleasesProps {
  title: string
  image: string
  overview: string
}

const Release: React.FC<ReleasesProps> = ({ title, image, overview }) => {
  return (
    <div className='w-64 h-96 shrink-0 relative release'>
      <Image
        unoptimized
        width={256}
        height={384}
        src={API_URL.IMAGES_W + image}
        alt={title}
      />
      <div
        className='w-full h-full absolute top-0 bg-gs_black flex
        text-xs font-poppins font-extralight descrip'
      >
        <div className='px-3 absolute top-1/2'>
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
