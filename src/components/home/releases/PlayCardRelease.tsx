import { API_URL } from '@/utils/API'
import Image from 'next/image'
import { type MouseEventHandler, type FC } from 'react'
import { BsPlayCircle } from 'react-icons/bs'

interface PlayCardProps {
  src: string
  title: string
  handle?: MouseEventHandler
}

const PlayCardRelease: FC<PlayCardProps> = ({ src, title, handle }) => {
  return (
    <div onClick={handle} className='relative cursor-pointer'>
      <Image
        width={300}
        height={220}
        src={`${API_URL.IMAGES_W}${src}`}
        alt={title}
      />

      <div
        className='w-full h-full bg-black bg-opacity-60 absolute top-0 p-2 opacity-0
        hover:opacity-100 transition-all'
      >
        <p className='text-sm'>
          {title}
        </p>
        <BsPlayCircle
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl'
        />
      </div>
    </div>
  )
}

export {
  PlayCardRelease
}
