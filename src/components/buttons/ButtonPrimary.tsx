import React, { type MouseEventHandler } from 'react'

interface ButtonPrimaryProps {
  title: string
  handle?: MouseEventHandler
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ title, handle }) => {
  return (
    <button
      type='button'
      className='p-2 bg-gs_orange font-poppins font-extralight text-sm hover:bg-gs_black
      transition-colors duration-400'
      onClick={handle}
    >
      {title}
    </button>
  )
}

export {
  ButtonPrimary
}
