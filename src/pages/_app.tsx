import { Layout } from '@/components/layout/Layout'
import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />

    </Layout>
  )
}

export default App
