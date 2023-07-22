import { type ReactNode, type FC } from 'react'

interface PlayProps {
  children: ReactNode
  fn: () => void
  labelButton: string
}

const PlayButton: FC<PlayProps> = ({ children, fn, labelButton }) => {
  return (
    <div className='flex cursor-pointer items-center justify-center gap-3'>
      {children}
      <button
        type='button'
        className='text-shadow underline underline-offset-8 mobile:text-lg desktop:text-xl'
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
