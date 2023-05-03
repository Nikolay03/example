import { ReactElement } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

export default function AsideTitle (props: HeadingProps): ReactElement {
  return (
    <Heading
      as={'h3'}
      lineHeight={'base'}
      fontSize={'lg'}
      fontWeight={'semibold'}
      {...props}
    />
  )
}
