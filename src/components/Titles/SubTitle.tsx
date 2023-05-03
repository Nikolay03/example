import { ReactElement } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

export default function SubTitle (props: HeadingProps): ReactElement {
  return (
    <Heading
      fontSize={{ base: 'lg', md: '2xl' }}
      lineHeight={'none'}
      mb={6}
      {...props}
    />
  )
}
