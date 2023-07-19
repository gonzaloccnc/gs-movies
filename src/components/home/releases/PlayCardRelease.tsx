import { API_URL } from '@/utils/API'
import Image from 'next/image'
import { type MouseEventHandler, type FC } from 'react'
import { BsPlayCircle } from 'react-icons/bs'

interface PlayCardProps {
  src: string
  title: string
  handle?: MouseEventHandler
  local: boolean
  width?: string
}

const PlayCardRelease: FC<PlayCardProps> = ({ src, title, handle, local, width }) => {
  const source = local ? src : `${API_URL.IMAGES_W}${src}`
  const widthLocal = width ?? 'w-[300px]'

  return (
    <div onClick={handle} className={`relative cursor-pointer ${widthLocal}`}>
      <Image
        fill
        src={source}
        alt={title}
        sizes='(max-width: 1200px) 300px'
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
