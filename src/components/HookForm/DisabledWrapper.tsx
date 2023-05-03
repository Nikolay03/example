import { ReactElement, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  isDisabled?: boolean
}

export default function DisabledWrapper (props: Props): ReactElement {
  const { children, isDisabled } = props

  return (
    <Box
      cursor={isDisabled ? 'not-allowed' : 'unset'}
      opacity={isDisabled ? '0.5' : 'unset'}
      pos={'relative'}
      pointerEvents={isDisabled ? 'none' : 'unset'}>
      {children}
    </Box>
  )
}
