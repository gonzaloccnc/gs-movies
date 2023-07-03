import { useEffect, type FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ children }) => {
  const portal = document.querySelector('#portal_root') as HTMLElement
  const portalChild = document.createElement('section')

  portalChild.classList.add(
    'fixed',
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'bg-black',
    'z-50'
  )

  useEffect(() => {
    portal.appendChild(portalChild)

    return () => { portalChild.remove() }
  }, [portalChild, portal])

  return createPortal(children, portalChild)
}

export {
  Modal
}
