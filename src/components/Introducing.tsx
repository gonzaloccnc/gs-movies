
interface IntroProps {
  ownClass?: string
  label: string
  title: string
  content: string
  children?: React.ReactNode
}

const Introducing: React.FC<IntroProps> = ({ label, title, content, children, ownClass }) => {
  return (
    <div className='relative h-full w-full  mobile:my-6 mobile:px-5 desktop:mt-0 desktop:px-0'>
      <div className='before:absolute before:-left-10 before:w-[1px] before:animate-line before:bg-white before:content-[""]
           desktop:absolute desktop:left-56 desktop:top-1/2 desktop:w-3/5
           desktop:-translate-y-1/2'
      >
        <h3 className='font-light desktop:text-xl'>{label}</h3>
        <h1
          className='font-normal leading-tight mobile:mb-6 mobile:text-3xl desktop:mb-16
          desktop:text-7xl'
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
