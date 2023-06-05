import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: React.FC = () => {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <main id='portal_root'></main>
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
