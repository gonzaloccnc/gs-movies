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
    <div className='w-[285px] h-full shrink-0 relative release'>
      <Image
        unoptimized
        width={285}
        height={428}
        src={API_URL.IMAGES_W + image}
        alt={title}
        priority
      />
      <div
        className='w-full h-full absolute top-0 bottom-0 bg-gs_black flex
        text-xs font-poppins font-extralight descrip'
      >
        <div className='px-3 absolute top-[60%]'>
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