import React from 'react'

const Newsletter: React.FC = () => {
  return (
    <section className='py-8 pl-56'>
      <div className='pl-5 border-l border-white h-52 flex flex-col justify-between'>
        <div>
          <h1 className='font-poppins font-extralight'>GSL Newsletter</h1>
          <span className='text-7xl'>See first</span>
        </div>
        <div className='flex gap-5'>
          <input
            type='email'
            placeholder='Type your email here*'
            className='outline-none border-4 border-red-600 bg-transparent px-4 py-2 w-1/2'
          />
          <button type='button' className='text-red-600 border-2 border-red-600 px-6 uppercase'>
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}

export {
  Newsletter
}
