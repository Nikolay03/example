import { ReactElement } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

export default function Title (props: HeadingProps): ReactElement {
  return (
    <Heading
      fontSize={{ base: '2xl', md: '2rem' }}
      fontWeight={'bold'}
      lineHeight={'normal'}
      {...props}
    />
  )
}
