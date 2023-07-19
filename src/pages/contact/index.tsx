import { type FC } from 'react'
import Head from 'next/head'
import { Introducing } from '@/components/Introducing'
import { LoremText } from '@/utils/Font'

const ContactPage: FC = () => {
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
        className='flex desktop:pl-56 desktop:px-0 gap-5 font-light cursor-default mb-20
        desktop:flex-row mobile:flex-col mobile:px-5'
      >
        <div className='desktop:w-1/2 mobile:w-full'>
          <p className='desktop:w-4/5 leading-9'>{LoremText}</p>
        </div>
        <div className='desktop:w-1/4 flex flex-col gap-4 '>
          <h3 className='text-gs_orange'>Office 01</h3>
          <ul className='flex flex-col gap-4'>
            <li>Av. Fray A.Alcalde 10.</li>
            <li>44100 Guad., Jal., Mexico</li>
            <li>info@misitio.com</li>
            <li>Tel: +52-1-33-12345678</li>
          </ul>
        </div>
        <div className='desktop:w-1/4 flex flex-col gap-4'>
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
