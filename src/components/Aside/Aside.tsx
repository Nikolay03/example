import { ReactElement, ReactNode } from 'react'
import { Heading, Stack, StackProps } from '@chakra-ui/react'

interface Props extends Omit<StackProps, 'title'> {
  title?: ReactNode
}

export default function Aside (props: Props): ReactElement {
  const { children, title, ...restProps } = props

  return (
    <Stack
      bgColor={'gray.100'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 6 }}
      spacing={6}
      {...restProps}>
      <Heading fontSize={'lg'} lineHeight={'shorter'}>
        {title}
      </Heading>

      {children}
    </Stack>
  )
}
