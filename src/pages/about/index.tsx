import Head from 'next/head'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '@/utils/Font'
import { type NextPage, type GetStaticProps } from 'next'
import axios from 'axios'
import { type RandomJSON, type UserRandom } from '@/types/randomUser'
import { CardEmployee } from '@/components/cards/CardEmployee'

interface AboutProps {
  randoms: UserRandom[]
}

const AboutPage: NextPage<AboutProps> = ({ randoms }) => {
  return (
    <>
      <Head>
        <title>GS - Movies: About</title>
      </Head>
      <section className='w-full desktop:h-screen'>
        <Introducing
          label='About'
          title='GS Productions'
          content={LoremText}
        />
      </section>

      <section className='mb-14'>
        <div className='mobile:mb-8 mobile:px-5 desktop:mb-16 desktop:pl-56'>
          <h3 className='mb-2 text-base font-extralight'>The Team</h3>
          <h2 className='mobile:text-2xl desktop:text-5xl'>GS people</h2>
        </div>

        <div
          className='grid mobile:grid-cols-1 mobile:gap-12 mobile:px-8 tablet:grid-cols-2
          desktop:grid-cols-3 desktop:gap-32 desktop:px-16'
        >
          {
            randoms.map(x => (
              <CardEmployee
                key={x.email}
                name={x.name.first.concat(' ', x.name.last)}
                email={x.email}
                ubication={x.location.country.concat(', ', x.location.state)}
                image={x.picture.large}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ randoms: UserRandom[] }> = async () => {
  const { data } = await axios.get<RandomJSON>('https://randomuser.me/api/?results=15')

  return {
    props: {
      randoms: data.results
    }
  }
}

export default AboutPage
