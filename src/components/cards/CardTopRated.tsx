import { AiOutlineDollar, AiOutlinePlayCircle } from 'react-icons/ai'

interface TopRatedProps {
  src: string
  title: string
  handle?: React.MouseEventHandler
  homepage: string
}

const CardTopRated: React.FC<TopRatedProps> = ({ src, title, handle, homepage }) => {
  return (
    <div
      onClick={handle}
      className='h-[240px] cursor-pointer bg-cover'
      style={{ backgroundImage: `url(${src})` }}
    >

      <div className='flex h-full w-full flex-col items-center justify-center bg-top'>
        <p className='text-center text-sm'>{title}</p>
        <div className='flex items-center justify-center gap-2'>
          <AiOutlinePlayCircle className='text-3xl' />
          <a href={homepage} target='_blank'>
            <AiOutlineDollar className='text-3xl' />
          </a>
        </div>
      </div>

    </div>
  )
}

export {
  CardTopRated
}
