import React from 'react'

interface ButtonPrimaryProps {
  title: string
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ title }) => {
  return (
    <button
      type='button'
      className='p-2 bg-gs_orange font-poppins font-extralight text-sm hover:bg-gs_black
      transition-colors duration-400'
    >
      {title}
    </button>
  )
}

export {
  ButtonPrimary
}
