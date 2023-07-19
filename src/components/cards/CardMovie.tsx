import { API_URL } from '@/utils/API'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

interface CardProps {
  id: number
  title: string
  year: string
  content: string
  src: string
  isLast: boolean
  newLimit: () => void
}

const CardMovie: React.FC<CardProps> = ({ title, year, content, src, isLast, newLimit, id }) => {
  const formatYear = new Date(year)
  const [imgSrc, setImgSrc] = useState<string>(src !== null ? API_URL.IMAGES_W + src : '/imageNotFound.png')
  const cardRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const handleError = async (): Promise<void> => {
    try {
      const { data } = await axios.get(API_URL.IMAGES_W + src, { responseType: 'blob' })
      setImgSrc(URL.createObjectURL(data))
    } catch (error) {
      console.error(error)
    }
    // setImgSrc('/imageNotFound.png')
  }

  useEffect(() => {
    if (cardRef.current === null) return

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(cardRef.current)
  }, [isLast])

  return (
    <div
      className='font-poppins cursor-pointer'
      ref={isLast ? cardRef : null}
      onClick={() => { void router.push(`/release/${id}`) }}
    >
      <Image
        width={100}
        height={100}
        className='w-full hover:opacity-30 object-cover'
        src={imgSrc}
        onError={() => { void handleError() }}
        alt={title}
      />
      <h3 className='flex items-center gap-2 text-xs font-light my-3'>
        {title}
        <span>|</span>
        <span>{formatYear.getFullYear()}</span>
      </h3>
      <p className='text-sm line-clamp-3 max-h-16 hover:line-clamp-none hover:max-h-72
         transition-all ease-text'>
        {content.length === 0 ? 'Empty overview' : content}
      </p>
    </div>
  )
}

export {
  CardMovie
}
