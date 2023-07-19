import { barlow, poppins } from '@/utils/Font'
import React from 'react'
import { Header } from '../Header'
import { Newsletter } from '@/components/newsletter/Newsletter'
import { ChatPopup } from '@/components/popups/ChatPopup'
interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${barlow.style.fontFamily};
        }
        body {
          color: #ffffff;
        }
      `}</style>
      <Header />
      <main className={poppins.variable + ' bg-gs_dark'}>
        {children}
        <Newsletter />
        <ChatPopup />
      </main>
    </>
  )
}

export {
  Layout
}
