import Link from 'next/link'
import React from 'react'

const ShortAbout: React.FC = () => {
  return (
    <section className='py-16'>
      <h2 className='flex gap-5 text-lg font-poppins font-extralight justify-center mb-8'>
        Movies
        <span>|</span>
        TV Programs
        <span>|</span>
        Production
      </h2>
      <h1 className='text-5xl text-center mb-7'>About GSL Productions</h1>
      <div className='text-center'>
        <p className='font-poppins font-extralight mx-auto w-1/2'>
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
