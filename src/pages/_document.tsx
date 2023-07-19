import { Html, Head, Main, NextScript } from 'next/document'

const Document: React.FC = () => {
  return (
    <Html lang='en' className='scroll-smooth'>
      <Head />
      <body>
        <Main />
        <section id='portal_root'></section>
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
