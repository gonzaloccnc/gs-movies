import Head from 'next/head'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '@/utils/Font'
import { type GetStaticProps } from 'next'
import axios from 'axios'
import { type RandomJSON, type UserRandom } from '@/types/randomUser'
import { CardEmployee } from '@/components/cards/CardEmployee'

interface AboutProps {
  randoms: UserRandom[]
}

const AboutPage: React.FC<AboutProps> = ({ randoms }) => {
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
        <div className='desktop:pl-56 desktop:mb-16 mobile:px-5 mobile:mb-8'>
          <h3 className='text-base font-extralight mb-2'>The Team</h3>
          <h2 className='desktop:text-5xl mobile:text-2xl'>GS people</h2>
        </div>

        <div
          className='grid desktop:grid-cols-3 mobile:grid-cols-1 desktop:gap-32 desktop:px-16
          mobile:gap-12 mobile:px-8'
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
