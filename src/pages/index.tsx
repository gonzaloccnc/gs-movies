import { ShortAbout } from '@/components/home/about/ShortAbout'
import { Banner } from '@/components/home/banner/Banner'
import { Newsletter } from '@/components/newsletter/Newsletter'
import { NextReleases } from '@/components/home/releases/NextReleases'
import { ReleasesWrap } from '@/components/home/releases/ReleasesWrap'
import { API_URL, type MoviesJSON } from '@/utils/API'
import Head from 'next/head'
import React from 'react'

interface HomePageProps {
  data: MoviesJSON
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
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
      <Newsletter />
    </>
  )
}

const getServerSideProps = async (): Promise<{ props: HomePageProps }> => {
  const req = await fetch(API_URL.MOVIES + 'popular', {
    headers: {
      Authorization: 'Bearer ' + (process.env.TOKEN as string)
    }
  })

  const json = await req.json() as MoviesJSON

  return {
    props: {
      data: json
    }
  }
}

export {
  getServerSideProps
}

export default HomePage
