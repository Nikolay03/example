import { ReactElement, ReactNode, Ref } from 'react'
import MultiCarousel, { CarouselProps } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

interface Props extends CarouselProps {
  children: ReactNode,
  innerRef: Ref<any>
}

export default function Carousel (props: Props): ReactElement {
  const { children, innerRef, ...restProps } = props

  return (
    // @ts-ignore
    <MultiCarousel ref={innerRef} {...restProps}>
      {children}
    </MultiCarousel>
  )
}
