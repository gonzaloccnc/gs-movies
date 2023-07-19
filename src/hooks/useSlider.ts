import { type RefObject, useRef, useState, useEffect } from 'react'

interface ReturnTypes<T> {
  click: number
  handleNextImage: () => void
  handlePrevImage: () => void
  slider: RefObject<T>
}

const useSlider = <T extends HTMLElement>(animations?: string): ReturnTypes<T> => {
  const slider = useRef<T>(null)
  const [click, setClicks] = useState<number>(0)

  useEffect(() => {
    if (slider.current != null) {
      slider.current.className += (animations ?? ' transition-all ease-slide duration-500')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNextImage = (): void => {
    setClicks(click + 1)
    if (slider.current !== null) {
      const sl = slider.current
      const gap = getComputedStyle(sl).columnGap.replace('px', '')
      const marginLeft = sl.firstElementChild?.clientWidth ?? 0
      const sum = click + 1
      sl.style.marginLeft = `-${(marginLeft + parseInt(gap)) * sum}px`
    }
  }

  const handlePrevImage = (): void => {
    setClicks(click - 1)

    if (slider.current !== null) {
      const sl = slider.current
      const gap = getComputedStyle(sl).columnGap.replace('px', '')
      const marginLeft = sl.firstElementChild?.clientWidth ?? 0
      const rest = click - 1
      sl.style.marginLeft = `-${(marginLeft + parseInt(gap)) * rest}px`
    }
  }

  return {
    click,
    handleNextImage,
    handlePrevImage,
    slider
  }
}

export {
  useSlider
}
