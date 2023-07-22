import { type NextPage } from 'next'
import Link from 'next/link'

interface ErrorProps {
  statusCode?: number
}

const PageErrorGen: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className='grid h-screen w-full place-content-center text-center font-poppins font-semibold'>
      <p className='text-4xl'>
        {
          statusCode === undefined
            ? 'An error occurred on server'
            : 'An error occurred on client'
        }
      </p>
      <p className='text-7xl'>{statusCode ?? 500}</p>
      <Link href='/' className='text-gs_orange underline underline-offset-8'>
        Return to home
      </Link>
    </div>
  )
}

PageErrorGen.getInitialProps = ({ res, err }) => {
  const statusCode = res != null ? res.statusCode : (err != null) ? err.statusCode : 404
  return { statusCode }
}

export default PageErrorGen
