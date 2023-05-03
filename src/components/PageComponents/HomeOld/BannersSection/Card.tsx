import { ReactElement, ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

import { Title } from '~/components/Titles'

interface Props extends BoxProps {
  children: ReactNode
  title: string
  isMain?: boolean
}

export default function Card (props: Props): ReactElement {
  const { title, isMain, children, ...restProps } = props

  return (
    <Box
      bgImage={'url(/assets/dots.png)'}
      bgPos={'100% 100%'}
      bgRepeat={'no-repeat'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      p={{ base: 4, md: 9, lg: 14 }}
      {...restProps}>
      <Title
        as={isMain ? 'h1' : undefined}
        lineHeight={{ base: 'base', md: 'normal' }}>
        {title}
      </Title>
      {children}
    </Box>
  )
}
