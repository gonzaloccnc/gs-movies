import Link from 'next/link'
import React from 'react'

const ShortAbout: React.FC = () => {
  return (
    <section className='py-16'>
      <h2 className='mb-8 flex justify-center gap-5 text-lg font-extralight'>
        Movies
        <span>|</span>
        TV Programs
        <span>|</span>
        Production
      </h2>
      <h1 className='mb-7 text-center mobile:text-3xl desktop:text-5xl'>
        About GSL Productions
      </h1>
      <div className='text-center'>
        <p className='font-extralight mobile:px-5 desktop:mx-auto desktop:w-1/2 desktop:px-5'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nesciunt quaerat nisi
          fuga labore, consectetur culpa nulla accusantium perspiciatis officia sed explicabo
          dignissimos cupiditate ad odit quod laboriosam, sint quisquam
        </p>
        <Link href='/about' className='text-orange-600'>+ Mas informacion</Link>
      </div>
    </section>
  )
}

export {
  ShortAbout
}
