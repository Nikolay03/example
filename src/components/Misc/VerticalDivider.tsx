import { ReactElement } from 'react'
import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react'

export default function Divider (props: DividerProps): ReactElement {
  return (
    <ChakraDivider
      borderColor={'gray.500'}
      h={4}
      opacity={1}
      orientation={'vertical'}
      {...props}
    />
  )
}
