import Head from 'next/head'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '@/utils/Font'
import { type NextPage } from 'next'

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>GS - Movies: Contacto</title>
      </Head>
      <section className='w-full desktop:h-[80vh]'>
        <Introducing
          label='Contact us'
          title='GS productions Offices'
          content={LoremText}
        />
      </section>

      <section
        className='mb-20 flex cursor-default gap-5 font-light mobile:flex-col mobile:px-5
        desktop:flex-row desktop:px-0 desktop:pl-56'
      >
        <div className='mobile:w-full desktop:w-1/2'>
          <p className='leading-9 desktop:w-4/5'>{LoremText}</p>
        </div>
        <div className='flex flex-col gap-4 desktop:w-1/4 '>
          <h3 className='text-gs_orange'>Office 01</h3>
          <ul className='flex flex-col gap-4'>
            <li>Av. Fray A.Alcalde 10.</li>
            <li>44100 Guad., Jal., Mexico</li>
            <li>info@misitio.com</li>
            <li>Tel: +52-1-33-12345678</li>
          </ul>
        </div>
        <div className='flex flex-col gap-4 desktop:w-1/4'>
          <h3 className='text-gs_orange'>Office 02</h3>
          <ul className='flex flex-col gap-4'>
            <li>Av. Fray A.Alcalde 10.</li>
            <li>44100 Guad., Jal., Mexico</li>
            <li>info@misitio.com</li>
            <li>Tel: +52-1-33-12345678</li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default ContactPage
