import { useState, useEffect, RefObject } from 'react'

import debounce from '~/utils/debounce'

type TDimensions = {
  height: number
  width: number
}

export default function useDimensions (ref: RefObject<HTMLElement>): TDimensions {
  const defaultDimensions = { width: 0, height: 0 }

  const [dimensions, setDimensions] = useState<TDimensions>(defaultDimensions)

  function updateDimensions (element: HTMLElement): void {
    if (element) {
      setDimensions(prevDimensions => ({
        ...prevDimensions,
        height: element.offsetHeight,
        width: element.offsetWidth
      }))
    }
  }

  useEffect(() => {
    const element = ref.current
    setTimeout(() => {
      updateDimensions(element)
    }, 100)

    const debouncedResize = debounce(() => {
      updateDimensions(element)
    }, 300)

    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [])

  return dimensions
}
