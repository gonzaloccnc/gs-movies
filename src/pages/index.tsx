import { ShortAbout } from '@/components/home/about/ShortAbout'
import { Banner } from '@/components/home/banner/Banner'
import { NextReleases } from '@/components/home/releases/NextReleases'
import { ReleasesWrap } from '@/components/home/releases/ReleasesWrap'
import { type MoviesJSON } from '@/utils/API'
import Head from 'next/head'
import { axiosServer } from '@/utils/axios'
import { type NextPage, type GetServerSideProps } from 'next'

interface HomePageProps {
  data: MoviesJSON
}

const HomePage: NextPage<HomePageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>GS - Movies</title>
        <meta name='description' content='Movies and trailers of last releases in the world' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner movieData={data.results[0]} />
      <ReleasesWrap releases={data.results} />
      <ShortAbout />
      <NextReleases />
    </>
  )
}

const getServerSideProps: GetServerSideProps<{ data: MoviesJSON }> = async () => {
  const { data } = await axiosServer.get<MoviesJSON>('popular')

  return {
    props: {
      data
    }
  }
}

export {
  getServerSideProps
}

export default HomePage
