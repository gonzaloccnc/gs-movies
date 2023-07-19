
interface IntroProps {
  ownClass?: string
  label: string
  title: string
  content: string
  children?: React.ReactNode
}

const Introducing: React.FC<IntroProps> = ({ label, title, content, children, ownClass }) => {
  return (
    <div className='w-full h-full relative'>
      <div className='w-3/5 absolute top-1/2 -translate-y-1/2 left-56 before:absolute
           before:content-[""] before:-left-10 before:w-[1px] before:bg-white
           before:animate-line'
      >
        <h3 className='text-xl font-light font-poppins'>{label}</h3>
        <h1 className='text-7xl font-normal leading-tight mb-16'>{title}</h1>
        <p className='w-3/5'>{content}</p>
        {children}
      </div>
    </div>
  )
}

export {
  Introducing
}
