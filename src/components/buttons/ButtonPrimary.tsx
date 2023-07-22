import React, { type MouseEventHandler } from 'react'

interface ButtonPrimaryProps {
  ownClass?: string
  title: string
  handle?: MouseEventHandler
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ title, handle, ownClass }) => {
  return (
    <button
      type='button'
      className={`bg-gs_orange p-2 text-sm font-extralight transition-colors
      duration-500 hover:bg-gs_black ${ownClass ?? ''}`}
      onClick={handle}
    >
      {title}
    </button>
  )
}

export {
  ButtonPrimary
}
