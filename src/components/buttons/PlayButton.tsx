import { type ReactNode, type FC } from 'react'

interface PlayProps {
  children: ReactNode
  fn: () => void
  labelButton: string
}

const PlayButton: FC<PlayProps> = ({ children, fn, labelButton }) => {
  return (
    <div className='flex items-center gap-3 justify-center cursor-pointer'>
      {children}
      <button
        type='button'
        className='underline underline-offset-8 text-xl text-shadow'
        onClick={fn}
      >
        {labelButton}
      </button>
    </div>
  )
}

export {
  PlayButton
}
