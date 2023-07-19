
interface IntroProps {
  ownClass?: string
  label: string
  title: string
  content: string
  children?: React.ReactNode
}

const Introducing: React.FC<IntroProps> = ({ label, title, content, children, ownClass }) => {
  return (
    <div className='w-full h-full relative  desktop:mt-0 desktop:px-0 mobile:px-5 mobile:my-6'>
      <div className='desktop:w-3/5 desktop:absolute desktop:top-1/2 desktop:-translate-y-1/2 desktop:left-56 before:absolute
           before:content-[""] before:-left-10 before:w-[1px] before:bg-white
           before:animate-line'
      >
        <h3 className='desktop:text-xl font-light'>{label}</h3>
        <h1
          className='desktop:text-7xl font-normal leading-tight desktop:mb-16 mobile:mb-6
          mobile:text-3xl'
        >
          {title}
        </h1>
        <p className='desktop:w-3/5'>{content}</p>
        {children}
      </div>
    </div>
  )
}

export {
  Introducing
}
