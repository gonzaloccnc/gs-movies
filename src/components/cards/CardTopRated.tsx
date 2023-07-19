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
      className='cursor-pointer h-[240px] bg-cover'
      style={{ backgroundImage: `url(${src})` }}
    >

      <div className='flex flex-col bg-top w-full h-full items-center justify-center'>
        <p className='text-sm text-center'>{title}</p>
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
