import { type RefObject, useRef, useState, useEffect } from 'react'

interface ReturnTypes<T> {
  click: number
  totalObjects: number
  handleNextImage: () => void
  handlePrevImage: () => void
  slider: RefObject<T>
}

const useSlider = <T extends HTMLElement>(animations?: string): ReturnTypes<T> => {
  const slider = useRef<T>(null)
  const [totalObjects, setTotalObjects] = useState(0)
  const [click, setClicks] = useState(0)

  useEffect(() => {
    if (slider.current != null) {
      slider.current.className += (animations ?? ' transition-all ease-slide duration-500')
      const childWidth = slider.current.firstElementChild?.clientWidth ?? 0
      const screenElements = Math.floor(slider.current.clientWidth / childWidth)
      setTotalObjects(slider.current.childElementCount - screenElements)
    }
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
    totalObjects,
    handleNextImage,
    handlePrevImage,
    slider
  }
}

export {
  useSlider
}
