import { ReactElement, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

import BaseLayout from './BaseLayout'

import Container from '~/components/Container'

interface Props {
  children: ReactNode
}

export default function PageLayout ({ children }: Props): ReactElement {
  return (
    <BaseLayout>
      <Container>
        <Box pt={8} pb={{ base: 12, sm: 20 }}>
          {children}
        </Box>
      </Container>
    </BaseLayout>
  )
}
