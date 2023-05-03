import { ReactElement } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

export default function PageHeading (props: HeadingProps): ReactElement {
  return (
    <Heading
      as={'h1'}
      fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
      lineHeight={'normal'}
      {...props}
    />
  )
}
