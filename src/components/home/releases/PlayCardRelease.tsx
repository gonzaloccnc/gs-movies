import { API_URL } from '@/utils/API'
import { type MouseEventHandler, type FC } from 'react'
import { BsPlayCircle } from 'react-icons/bs'

interface PlayCardProps {
  src: string
  title: string
  handle?: MouseEventHandler
  local: boolean
}

const PlayCardRelease: FC<PlayCardProps> = ({ src, title, handle, local }) => {
  const source = local ? src : `${API_URL.IMAGES_W}${src}`

  return (
    <div
      onClick={handle}
      className='relative w-[300px] shrink-0 cursor-pointer bg-cover bg-center'
      style={{ backgroundImage: `url(${source})` }}
    >
      <div
        className='absolute top-0 h-full w-full bg-black/60 p-2 opacity-0
        transition-all hover:opacity-100'
      >
        <p className='text-sm'>
          {title}
        </p>
        <BsPlayCircle
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl'
        />
      </div>
    </div>
  )
}

export {
  PlayCardRelease
}
