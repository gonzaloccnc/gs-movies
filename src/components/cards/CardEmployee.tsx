import Image from 'next/image'

interface EmployeeProps {
  name: string
  ubication: string
  email: string
  image: string
}

const CardEmployee: React.FC<EmployeeProps> = ({ name, ubication, email, image }) => {
  return (
    <div
      className='relative w-full grayscale mobile:flex mobile:flex-col mobile:items-center
      tablet:block'
    >
      <Image
        src={image}
        alt={name}
        width={309}
        height={309}
      />
      <div className='mt-5 flex flex-col gap-3'>
        <h2 className='text-2xl'>{name}</h2>
        <h3 className='text-sm font-light'>{ubication}</h3>
        <p className='text-sm font-light'>{email}</p>
      </div>
    </div>
  )
}

export {
  CardEmployee
}
